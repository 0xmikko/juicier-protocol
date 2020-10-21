import {BigNumber} from 'bignumber.js';

export interface Reserve {
  symbol: string,
  totalLiquidity: BigNumber;
  availableLiquidity: BigNumber;
  loanToValue: BigNumber;
  liquidationThreshold: BigNumber;
  liquidationBonus: BigNumber;
  borrowRate: BigNumber;
  lendingRate: BigNumber;
  vTokenContract: string;
  isActive: boolean;
}
