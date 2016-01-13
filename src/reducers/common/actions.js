'use strict';

import { NAVIGATE_TO } from './actionTypes';

export const navigateTo = (destination, parameters) => {
  return {
    type: NAVIGATE_TO,
    destination,
    parameters    
  };
}

// Helper

export const _makeReadyAction = (action, ready, result, errors) => {
  return Object.assign({}, action, { ready, result, errors })
}

// export const _errorMsg = message => {
//   return { message };
// }

export const _promiseActionThunk = (promise, action, validate) => {
  return (dispatch, getState) => {
    // Validation
    validate = validate || (() => {});
    var validation = validate(state, action);
    if (!validation.valid) {
      dispatch(makeReadyAction(action, true, undefined, validation.errors));
      return;
    }    
    // Execute
    dispatch(makeReadyAction(action, false));
    promise.then(
      result => dispatch(makeReadyAction(action, true, result)),
      error => dispatch(makeReadyAction(action, true, undefined, [error]))
    );
  };
}