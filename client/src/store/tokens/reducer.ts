import {TokenActions} from './index';
import {Token} from '../../core/token';

export interface TokenState {
  data: Record<string, Token>;
}

const initialState: TokenState = {
  data: {}
};

export default function createReducer(
  state: TokenState = initialState,
  action: TokenActions
): TokenState {
  switch (action.type) {
    case 'TOKEN_DETAILS':
      return state
    case 'TOKEN_FAILED':
      return {
        data: {}
      };
  }

  return state;
}
