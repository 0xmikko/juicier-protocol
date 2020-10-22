import Web3 from 'web3';
import {RootState} from '../index';
import {getContract} from '../../utils/getContract';
import {PoolService} from '../../../../types/web3-v1-contracts/PoolService';
import {ReserveRepository} from '../../../../types/web3-v1-contracts/ReserveRepository';
import {ProviderRepository} from '../../../../types/web3-v1-contracts/ProviderRepository';
import {AaveProvider} from '../../../../types/web3-v1-contracts/AaveProvider';
import {IAaveLendingPool} from '../../../../types/web3-v1-contracts/IAaveLendingPool';

export const web3Selector = (state: RootState) => state.web3;

export type Web3Error = 'NO_ERROR' | 'CONNECTION_ERROR' | 'WRONG_NETWORK_ERROR';

export type Web3Actions =
  | {
      type: 'WEB3_CONNECTED';
      payload: {
        web3: Web3;
        networkId: number;
        accounts: Array<string>;
        poolService: PoolService;
        poolServiceAddress: string;
        reserveRepository: ReserveRepository;
        providerRepository: ProviderRepository;
        aaveProvider: AaveProvider;
        aaveLendingPool: IAaveLendingPool;
      };
    }
  | {
      type: 'WEB3_FAILED';
      payload: {error: Web3Error};
    };
