// @flow
'use strict';

// import logJSON from '../../logJSON';
// import initialState from './initialState';
// import { AUTHENTICATE } from './actionTypes';

import type { Action } from '../actions/types'
import createRestReducer from './createRestReducer'
// import { Record, List, Map } from 'immutable';
//
// const Authentication = Record({
//   authenticated : false,
//   code: '',
// });

type AuthState = { authenticated: boolean, code: string };
type State = AuthState;

const initialState = {
  authenticated: false,
  code: ''
};

function auth(state: State = initialState, action: Action): State {
  // logJSON(action, "auth action")
  const { type, code } = action;

  switch(type) {
    case 'AUTHENTICATED':
      const authenticated = code !== undefined && code.length > 0;
      state = {authenticated, code};
      break;
  }
  return state;
}

// function fromCode(code:string): Authentication {
//   debugger;
//   return new Authentication({code});
// }
//
// export default createRestReducer('AUTHENTICATED', fromCode)

export default auth;
