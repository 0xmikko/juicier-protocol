import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {TokenActions} from './index';
import {Reserve} from '../../core/reserve';
import {BigNumber} from 'bignumber.js';

export const getAllowance = (): ThunkAction<void, RootState, unknown, TokenActions> => async (
  dispatch,
  getState
) => {

};

export const approve =  (): ThunkAction<void, RootState, unknown, TokenActions> => async (
    dispatch,
    getState
) => {

};
