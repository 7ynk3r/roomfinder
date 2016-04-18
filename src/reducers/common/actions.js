// @flow
'use strict';

// import { NAVIGATE_TO } from './actionTypes';
//
// export const navigateTo = (destination, parameters) => {
//   return {
//     type: NAVIGATE_TO,
//     destination,
//     parameters
//   };
// }

// Helper
//
// export const _makeReadyAction = (action: any, ready: boolean, result: any={}, errors: Array<any>=[]) => {
//   const hasErrors = errors.length>0;
//   return Object.assign({}, action, { ready, result, errors, hasErrors })
// }
//
// export const _dispatchPromiseAction = (dispatch: any, promise: Promise, action: any): Promise => {
//   dispatch(_makeReadyAction(action, false));
//   return promise.then(
//     result => dispatch(_makeReadyAction(action, true, result)),
//     error => dispatch(_makeReadyAction(action, true, undefined, [error]))
//   );
// }
//
// export const _promiseActionThunk = (promise: Promise, action: any, validate: any): {(a: any, b:any): Promise} => {
//   return (dispatch: any, getState: any): Promise => {
//     // Validation
//     const state = getState();
//     validate = validate || (() => {return{valid:true}});
//     var validation = validate(state, action);
//     if (!validation.valid) {
//       dispatch(_makeReadyAction(action, true, undefined, validation.errors));
//       return;
//     }
//     // Execute
//     _dispatchPromiseAction(dispatch, promise, action);
//   };
// }
//
// // Testing
//
// export const _delay = (time: Date): Promise => new Promise(fulfill => {
//   setTimeout(fulfill, time);
// });
