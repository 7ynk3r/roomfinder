// @flow
'use strict';

// import logJSON from '../../logJSON';
// import initialState from './initialState';
// import { AUTHENTICATE } from './actionTypes';

import types from '../actions/types'
import createRestReducer from './createRestReducer'
import { Record, List, Map } from 'immutable';

const Authentication = Record({
  authenticated : false,
  code: '',
});

const initialState = new Authentication();

export default (state: Authentication = initialState, action: Action = {}) => {
  // logJSON(action, "auth action")
  const { type, code } = action;

  switch(type) {
    case 'AUTHENTICATED':
      const authenticated = code && code.length > 0;
      debugger;
      state = state.merge({authenticated, code});
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
