// @flow
'use string';

// import calendar from './calendar/reducer';
import auth from './auth/reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // calendar,
  auth,
});

export default rootReducer;
