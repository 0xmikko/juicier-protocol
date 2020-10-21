import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {ReserveActions} from './index';
import {Reserve} from '../../core/reserve';
import {BigNumber} from 'bignumber.js';

export const getReserves = (): ThunkAction<void, RootState, unknown, ReserveActions> => async (
  dispatch,
  getState
) => {
  const result: Array<Reserve> = [];
  const {poolService, reserveRepository} = getState().web3;
  if (poolService === undefined || reserveRepository === undefined) {
    return;
  }

  const qty = parseInt(await reserveRepository.methods.getReservesQty().call());

  console.log("WWW", qty);

  for (let i = 0; i < qty; i++) {
    const reserve = await reserveRepository.methods.getReserveByIndex(i).call();
    const data = await poolService.methods.getReserveInfo(reserve).call();
    result.push({
      symbol: data[0],
      totalLiquidity: new BigNumber(data[1]),
      availableLiquidity: new BigNumber(data[2]),
      loanToValue: new BigNumber(data[3]),
      liquidationThreshold: new BigNumber(data[4]),
      liquidationBonus: new BigNumber(data[5]),
      borrowRate: new BigNumber(data[6]),
      lendingRate: new BigNumber(data[7]),
      vTokenContract: data[8],
      isActive: data[9],
    });
  }
  dispatch({
    type: 'RESERVES_LIST',
    payload: result,
  });
};
