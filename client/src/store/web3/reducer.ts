import Web3 from 'web3';
import {Web3Actions, Web3Error} from './index';
import {PoolService} from '../../../../types/web3-v1-contracts/PoolService';
import {ReserveRepository} from '../../../../types/web3-v1-contracts/ReserveRepository';
import {ProviderRepository} from '../../../../types/web3-v1-contracts/ProviderRepository';

export interface Web3State {
  web3: Web3 | null;
  accounts: Array<string>;
  poolService?: PoolService;
  reserveRepository?: ReserveRepository;
  providerRepository?: ProviderRepository;
  status: 'WEB3_STARTUP' | 'WEB3_CONNECTED' | 'NO_WEB3';
  error?: Web3Error;
}

const initialState: Web3State = {
  web3: null,
  accounts: [],
  status: 'WEB3_STARTUP',
};

export default function createReducer(
  state: Web3State = initialState,
  action: Web3Actions
): Web3State {
  switch (action.type) {
    case 'WEB3_CONNECTED':
      return {
        ...action.payload,
        status: 'WEB3_CONNECTED',
      };
    case 'WEB3_FAILED':
      return {
        web3: null,
        accounts: [],
        status: 'NO_WEB3',
        error: action.payload.error,
      };
  }

  return state;
}
