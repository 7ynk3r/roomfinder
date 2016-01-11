'use strict';

import { LOGIN } from './actionTypes';

export const _login = code => {
  return {
    type: LOGIN,
    code
  };
}

export const login = code => {
  var action = _login(code);
  return promiseActionThunk(undefined, action);
}
