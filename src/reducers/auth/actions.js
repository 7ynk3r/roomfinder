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
  let credentialsX;
  const promise = googleapi.authenticate(
    code,
    secret.google.client_id,
    secret.google.client_secret
  )
  .then((credentials)=>{
    credentialsX = credentials;
    debugger;
    return googleapi.calendars();
  })
  .then((calendars)=>{
    debugger;
    return credentials;
  });
  return _promiseActionThunk(promise, action);
}

// Mock

export const _authenticateMock = code => {
  const action = _authenticate(code);
  const result = {};
  const promise = _delay(2000).then(()=>Promise.resolve(result));
  return _promiseActionThunk(promise, action);
}
