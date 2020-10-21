import Web3 from 'web3';
import {RootState} from '../index';


export const reservesSelector = (state: RootState) => state.reserves;

export type Web3Actions =
  | {
      type: 'WEB3_CONNECTED';
      payload: {
          web3: Web3,
      }
    }
  | {
      type: 'WEB3_FAILED';
    };
