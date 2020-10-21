import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import Web3 from 'web3';
import {Web3Actions} from './index';


export const getReserves = (): ThunkAction<void, RootState, unknown, Web3Actions> => async (
  dispatch, getState
) => {

};
