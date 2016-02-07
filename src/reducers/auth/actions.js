'use strict';

import { AUTHENTICATE } from './actionTypes';

import { _promiseActionThunk, _makeReadyAction} from '../common/actions.js'

const delay = time => new Promise(fulfill => {
  setTimeout(fulfill, time);
});

export const _authenticate = code => {
  return {
    type: AUTHENTICATE,
    code
  };
}

export const authenticate = code => {
  var action = _authenticate(code);
  return promiseActionThunk(undefined, action);
}

// export const _freeEventMock = eventId => {
//   const action = _freeEvent(eventId);
//   const result = { id : 0 };
//   logJSON(result, '<<<<');
//   const promise = delay(2000).then(()=>Promise.resolve(result));
//   return _promiseActionThunk(promise, action);
// }
