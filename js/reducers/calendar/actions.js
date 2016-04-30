// // @flow
// 'use strict';
//
// import logJSON from '../../logJSON'
// // import {
// //   _promiseActionThunk,
// //   _dispatchPromiseAction,
// //   _makeReadyAction,
// //   _delay
// // } from '../common/actions.js'
//
// import googleapi from '../../lib/googleapi'
//
// import {
//   GET_CALENDARS,
// } from './actionTypes';
//
// export const _getCalendars = (calendars: any): {t: any, } => {
//   return {
//     type: GET_CALENDARS
//   };
// }
//
// export const getCalendars = () => (dispatch: any, getState: any): void => {
//   const action = _getCalendars();
//   const promise = googleapi.customerCalendarList();
//   _dispatchPromiseAction(dispatch, promise, action);
// }
