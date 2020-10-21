import {ReserveActions} from './index';
import {Reserve} from '../../core/reserve';

export interface ReserveState {
  data: Array<Reserve>;
}

const initialState: ReserveState = {
  data: [],
};

export default function createReducer(
  state: ReserveState = initialState,
  action: ReserveActions
): ReserveState {
  switch (action.type) {
    case 'RESERVES_LIST':
      return {
        data: action.payload,
      };
    case 'RESERVES_FAILED':
      return {
        data: [],
      };
  }

  return state;
}
