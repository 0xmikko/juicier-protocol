import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Web3Actions} from './index';
import Web3 from 'web3';
import {REQUIRED_NETWORK} from '../../config';
import {getContract} from '../../utils/getContract';
import {PoolService} from '../../../../types/web3-v1-contracts/PoolService';
import {ReserveRepository} from '../../../../types/web3-v1-contracts/ReserveRepository';
import {ProviderRepository} from '../../../../types/web3-v1-contracts/ProviderRepository';

declare global {
  interface Window {
    web3: Web3;
    ethereum: any;
  }
}

const poolServiceJson = require('../../contracts/PoolService.json');
const reserveRepositoryJson = require('../../contracts/ReserveRepository.json');
const providerRepositoryJson = require('../../contracts/ProviderRepository.json');
const providerInterface = require('../../contracts/ILendingProvider.json');

export const connectWeb3 = (): ThunkAction<void, RootState, unknown, Web3Actions> => async (
  dispatch
) => {
  console.log('CW3');
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    if (networkId !== REQUIRED_NETWORK) {
      dispatch({type: 'WEB3_FAILED', payload: {error: 'WRONG_NETWORK_ERROR'}});
      return;
    }

    const poolService = ((await getContract(web3, poolServiceJson)) as unknown) as PoolService;
    const reserveRepository = ((await getContract(
      web3,
      reserveRepositoryJson
    )) as unknown) as ReserveRepository;
    const providerRepository = ((await getContract(
      web3,
      providerRepositoryJson
    )) as unknown) as ProviderRepository;

    dispatch({
      type: 'WEB3_CONNECTED',
      payload: {web3, accounts, networkId, poolService, reserveRepository, providerRepository},
    });
  } else {
    dispatch({type: 'WEB3_FAILED', payload: {error: 'WRONG_NETWORK_ERROR'}});
  }
};
