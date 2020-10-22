import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {ReserveActions} from './index';
import {Reserve} from '../../core/reserve';
import {BigNumber} from 'bignumber.js';
import {getTokenContract} from "../tokens/actions";

export const getReserves = (): ThunkAction<void, RootState, unknown, ReserveActions> => async (
  dispatch,
  getState
) => {
  const result: Array<Reserve> = [];
  const {
    poolService,
    reserveRepository,
    providerRepository,
    aaveProvider,
    aaveLendingPool,
  } = getState().web3;
  if (poolService === undefined || reserveRepository === undefined || aaveLendingPool === undefined) {
    return;
  }

  const web3 = await getState().web3.web3;
  if (web3===null) throw new Error("Web3 is null!")
  // console.log(await providerRepository?.methods.)

  const qty = parseInt(await reserveRepository.methods.getReservesQty().call());

  console.log('WWW', qty);

  // const aaveReserves = await aaveProvider?.methods.getReserves().call();
  // if (aaveReserves === undefined) throw new Error('No Aave reserves');
  // if (aaveReserves === undefined) throw new Error('No Aave reserves');
  // for (let res of aaveReserves) {
  //   console.log('RESERVE ADDRESS', res);
  //   if (res != '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
  //     const tContract = await getTokenContract(web3, res);
  //     console.log(await tContract.methods.name().call())
  //     console.log(await tContract.methods.symbol().call())
  //   }
  //   const resData = await aaveLendingPool.methods.getReserveData(res).call()
  //   console.log(resData.aTokenAddress);
  //   console.log(await aaveProvider?.methods.getReserveData(res).call());
  // }

  for (let i = 0; i < qty; i++) {
    const reserve = await reserveRepository.methods.getReserveByIndex(i).call();
    console.log('RESERVE ADDRESS', reserve);

    const data = await poolService.methods.getReserveInfo(reserve).call();
    // console.log('DA', data);
    result.push({
      reserve,
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
