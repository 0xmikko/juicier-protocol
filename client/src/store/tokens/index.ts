import {RootState} from '../index';
import {Token} from '../../core/token';


export const tokenSelector = (id:string) => (state: RootState) => state.tokens.data[id];

export type TokenActions =
  | {
      type: 'TOKEN_DETAILS';
      payload: Token;

    }
  | {
      type: 'TOKEN_FAILED';
    };
