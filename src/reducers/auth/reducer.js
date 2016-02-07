import ../../../

import initialState from './initialState';
import { AUTHENTICATE } from './actionTypes';


export const api = (state = initialState, action = {}) => {
  const { type, ready, result, errors } = action;
  switch(type) {
    case actionTypes.AUTHENTICATE:
      if (ready) {
        if (error) {
          state = state.merge({errors});
        }
        const authenticated = !error;
        state = state.merge({authenticated});
      }
      state = state.merge({ready});
      return state;
  }
  return state;
}
