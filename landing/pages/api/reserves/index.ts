import {NextApiRequest, NextApiResponse} from 'next';
import {Reserve} from '../../../core/Reserve';

export const reservesList: Array<Reserve> = [
  {
    name: 'DAI',
    iconUrl: 'https://aave.com/static/media/dai.59d423e0.svg',
    marketSize: 200000,
    depositAPY: 0,
    depositVitamin: 0,
    borrowAPY: 0,
    borrowVitamin: 0,
  },
  {
    name: 'USD Coin',
    iconUrl: 'https://aave.com/static/media/usdc.8dd9681c.svg',
    marketSize: 200000,
    depositAPY: 0,
    depositVitamin: 0,
    borrowAPY: 0,
    borrowVitamin: 0,
  },
  {
    name: 'TrueUSD',
    iconUrl: 'https://aave.com/static/media/tusd.a9e1a2e9.svg',
    marketSize: 200000,
    depositAPY: 0,
    depositVitamin: 0,
    borrowAPY: 0,
    borrowVitamin: 0,
  },
  {
    name: 'USDT Coin',
    iconUrl: 'https://aave.com/static/media/usdt.49e25172.svg',
    marketSize: 200000,
    depositAPY: 0,
    depositVitamin: 0,
    borrowAPY: 0,
    borrowVitamin: 0,
  },
];

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(reservesList);
};
