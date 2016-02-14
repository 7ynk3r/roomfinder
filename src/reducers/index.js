'use string';

import calendar from './calendar/reducer';
import auth from './calendar/auth';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  calendar,
  auth,
});

export default rootReducer;
