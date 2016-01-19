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

export const _promiseActionThunk = (promise, action, validate) => {
  return (dispatch, getState) => {
    // Validation
    const state = getState();
    validate = validate || (() => {return{valid:true}});
    var validation = validate(state, action);
    if (!validation.valid) {
      dispatch(makeReadyAction(action, true, undefined, validation.errors));
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