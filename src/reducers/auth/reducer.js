
import logJSON from '../../logJSON';
import initialState from './initialState';
import { AUTHENTICATE } from './actionTypes';


export default (state = initialState, action = {}) => {
  // logJSON(action, "auth action")
  const { type, ready, result, errors, hasErrors } = action;

  switch(type) {
    case AUTHENTICATE:
      if (ready) {
        state = state.merge({errors});
        const authenticated = !hasErrors;
        state = state.merge({authenticated});
      }
      state = state.merge({ready});
      break;
  }
  return state;
}
