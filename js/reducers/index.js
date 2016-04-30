// @flow
'use string';

// import calendar from './calendar/reducer';
import auth from './auth';
import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   // calendar,
//   auth,
// });

const rootReducer = auth;

export default rootReducer;
