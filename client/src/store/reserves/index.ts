import {RootState} from '../index';
import {Reserve} from "../../core/reserve";


export const reservesSelector = (state: RootState) => state.reserves;

export type ReserveActions =
  | {
      type: 'RESERVES_LIST';
      payload: Array<Reserve>;

    }
  | {
      type: 'RESERVES_FAILED';
    };
