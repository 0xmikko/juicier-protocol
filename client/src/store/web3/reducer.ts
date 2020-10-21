import Web3 from 'web3';
import {Web3Actions} from './index';

export interface Web3State {
  web3: Web3 | null;
  status: 'WEB3_STARTUP' | 'WEB3_CONNECTED' | 'NO_WEB3';
}

const initialState: Web3State = {
  web3: null,
  status: 'WEB3_STARTUP',
};

export default function createReducer(
  state: Web3State = initialState,
  action: Web3Actions
): Web3State {
  switch (action.type) {
    case 'WEB3_CONNECTED':
      return {
        web3: action.payload.web3,
        status: 'WEB3_CONNECTED',
      };
    case 'WEB3_FAILED':
      return {
        web3: null,
        status: 'NO_WEB3',
      };
  }

  return state;
}
