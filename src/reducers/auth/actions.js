'use strict';

import { AUTHENTICATE } from './actionTypes'
import { _promiseActionThunk, _makeReadyAction, _delay } from '../common/actions.js'
import secret from './secret'
import googleapi from '../../lib/googleapi'

export const _authenticate = code => {
  return {
    type: AUTHENTICATE,
    code
  };
}

export const authenticate = code => {
  const action = _authenticate(code);
  const promise = googleapi.authenticate(
    code,
    secret.google.client_id,
    secret.google.client_secret
  );  
  return promiseActionThunk(promise, action);
}

// Mock

export const _authenticateMock = eventId => {
  const action = _authenticate(code);
  const result = { };
  const promise = delay(2000).then(()=>Promise.resolve(result));
  return _promiseActionThunk(promise, action);
}
