import {NextApiRequest, NextApiResponse} from 'next';
import {Reserve} from '../../../core/Reserve';
import Web3 from 'web3';
import {PoolService} from '../../../../types/web3-v1-contracts/PoolService';
import {ReserveRepository} from '../../../../types/web3-v1-contracts/ReserveRepository';
import {BigNumber} from 'bignumber.js';
import {rayRate, tokenDecimals} from './formaters';

export const reservesIcons: Record<string, string> = {
  DAI: 'https://aave.com/static/media/dai.59d423e0.svg',
  USDC: 'https://aave.com/static/media/usdc.8dd9681c.svg',
  TrueUSD: 'https://aave.com/static/media/tusd.a9e1a2e9.svg',
  'USDT Coin': 'https://aave.com/static/media/usdt.49e25172.svg',
};

export async function getContract(web3: Web3, artifact: any, address?: string) {
  const networkId = await web3.eth.net.getId();
  const deployedAddress = address || artifact.networks[networkId]?.address;

  // create the instance
  return new web3.eth.Contract(artifact.abi, deployedAddress);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result: Array<Reserve> = [];
  const web3 = new Web3();
  console.log(`https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`);
  web3.setProvider(
    new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`)
  );
  const poolServiceJson = require('../../../../build/contracts/PoolService.json');
  const poolService = ((await getContract(web3, poolServiceJson)) as unknown) as PoolService;

  const reserveRepositoryJson = require('../../../../build/contracts/ReserveRepository.json');
  const reserveRepository = ((await getContract(
    web3,
    reserveRepositoryJson
  )) as unknown) as ReserveRepository;

  const qty = parseInt(await reserveRepository.methods.getReservesQty().call());

  for (let i = 0; i < qty; i++) {
    const reserve = await reserveRepository.methods.getReserveByIndex(i).call();
    console.log('RESERVE ADDRESS', reserve);

    const data = await poolService.methods.getReserveInfo(reserve).call();
    // console.log('DA', data);
    result.push({
      name: data[0],
      iconUrl: reservesIcons[data[0]] || '',
      totalLiquidity: tokenDecimals(data[1], 18),
      availableLiquidity: tokenDecimals(data[2], 18),
      borrowRate: parseFloat(rayRate(new BigNumber(data[6]))),
      depositRate: parseFloat(rayRate(new BigNumber(data[7]))),
    });
  }

  console.log(result);

  res.status(200).json(result);
};
