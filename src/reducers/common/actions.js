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

export const _errorMsg = message => {
  return { message };
}
