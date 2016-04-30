// @flow

'use strict';

import { AUTHENTICATE } from './actionTypes'
// import { _promiseActionThunk, _makeReadyAction, _delay } from '../common/actions.js'
import secret from './secret'
import googleapi from '../../lib/googleapi'

export const _authenticate = (code:string) => {
  return {
    type: AUTHENTICATE,
    code
  };
}

export const authenticate = (code:string) => {
  const action = _authenticate(code);
  let credentialsX;
  const promise = googleapi.authenticate(
    code,
    secret.google.client_id,
    secret.google.client_secret
  );

  // return _promiseActionThunk(promise, action);
  return undefined;
}

// Mock

export const _authenticateMock = (code:string) => {
  const action = _authenticate(code);
  const result = {};
  // const promise = _delay(2000).then(()=>Promise.resolve(result));
  // return _promiseActionThunk(promise, action);
  return undefined;
}
