/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

/**
 * Lets you dispatch a function instead of an action.
 * This function will receive `dispatch` and `getState` as arguments.
 *
 * Useful for early exits (conditions over `getState()`), as well
 * as for async control flow (it can `dispatch()` something else).
 *
 * `dispatch` will return the return value of the dispatched function.
 */
const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)


// /**
//  * Lets you dispatch special actions with a { promise } field.
//  *
//  * This middleware will turn them into a single action at the beginning,
//  * and a single success (or failure) action when the `promise` resolves.
//  *
//  * For convenience, `dispatch` will return the promise so the caller can wait.
//  */
// const readyStatePromise = store => next => action => {
//   if (!action.promise) {
//     return next(action)
//   }

//   next(makePromiseAction(action, false))
//   return action.promise.then(
//     result => next(makePromiseAction(action, true, result)),
//     error => next(makePromiseAction(action, true, undefined, error))
//   )
// }
// // Export for testing pourposes.
// export const makePromiseAction = (action, ready, result, error) => {
//   return Object.assign({}, action, { ready, result, error })
// }
