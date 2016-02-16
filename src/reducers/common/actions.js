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

export const _makeReadyAction = (action, ready, result={}, errors=[]) => {
  const hasErrors = errors.length>0;
  return Object.assign({}, action, { ready, result, errors, hasErrors })
}

export const _promiseActionThunk = (promise, action, validate) => {
  return (dispatch, getState) => {
    // Validation
    const state = getState();
    validate = validate || (() => {return{valid:true}});
    var validation = validate(state, action);
    if (!validation.valid) {
      dispatch(_makeReadyAction(action, true, undefined, validation.errors));
      return;
    }    
    // Execute
    dispatch(_makeReadyAction(action, false));
    promise.then(
      result => dispatch(_makeReadyAction(action, true, result)),
      error => dispatch(_makeReadyAction(action, true, undefined, [error]))
    );
  };
}

// Testing

export const _delay = time => new Promise(fulfill => {
  setTimeout(fulfill, time);
});
