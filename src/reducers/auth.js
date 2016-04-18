// @flow
'use strict';

// import logJSON from '../../logJSON';
// import initialState from './initialState';
// import { AUTHENTICATE } from './actionTypes';

import { Action } from '../actions/types'
import createRestReducer from './createRestReducer'
// import { Record, List, Map } from 'immutable';
//
// const Authentication = Record({
//   authenticated : false,
//   code: '',
// });

type AuthState = { authenticated: boolean, code: string };

const initialState = {
  authenticated: false,
  code: ''
};

export default (state: AuthState = initialState, action: Action = {}) => {
  // logJSON(action, "auth action")
  const { type, code } = action;
  switch(type) {
    case 'AUTHENTICATED':
      const authenticated = code && code.length > 0;
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
