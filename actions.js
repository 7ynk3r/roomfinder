// import googleapi from './googleapi'
import * as actionTypes from './actionTypes'

// Object creators

export const makeReadyAction = (action, ready, result, errors) => {
  return Object.assign({}, action, { ready, result, errors })
}

export const errorMsg = message => {
  return { message };
}

// Helper functions

export const promiseActionThunk = (promise, action, validate) => {
  return (dispatch, getState) => {
    // Validation
    validate = validate || (() => {});
    var validation = validate(state, action);
    if (!validation.valid) {
      dispatch(makeReadyAction(action, true, undefined, validation.errors));
      return;
    }    
    // Execute
    dispatch(makeReadyAction(action, false));
    promise.then(
      result => dispatch(makeReadyAction(action, true, result)),
      error => dispatch(makeReadyAction(action, true, undefined, [error]))
    );
  };
}


// Actions

export const _getEvents = () => {
  return {
    type: actionTypes.GET_SLOTS
  };
}

export const getEvents = () => {
  var action = _getEvents();
  return promiseActionThunk(undefined, action);
}

export const _takeEvent = eventId => {
  return {
    type: actionTypes.UPDATE_SLOT,
    taken : true,
    eventId
  };
}

export const takeEvent = eventId => {
  var action = _takeEvent(eventById);
  return promiseActionThunk(undefined, action, takeEventValidation);
}

export const _freeEvent = eventId => {
  return {
    type: actionTypes.UPDATE_SLOT,
    taken : false,
    eventId
  };
}

export const freeEvent = eventId => {
  var action = _freeEvent(eventById);
  return promiseActionThunk(undefined, action, freeEventValidation);
}

export const _authenticate = code => {
  return {
    type: actionTypes.AUTHENTICATE,
    code
  };
}

export const authenticate = code => {
  var action = _authenticate(code);
  return promiseActionThunk(undefined, action);
}

function delay(time) {
  return new Promise(function (fulfill) {
    setTimeout(fulfill, time);
  });
}

// export function getCalendarList() {
//   return {
//     type: actionTypes.GET_SLOTS,
//     promise: delay(1)
//   };
// };



// Validations

export const takeEventValidation = (state, action) => {
  var errors = [];
  // The event has to exists.
  const event = eventById[eventId];
    
  if (event === undefined) {
    errors.push(errorMsg('the event doesn\'t exists'));
  }
  if (event.ready === false) {
    errors.push(errorMsg('there are other actions taking place'));
  }
  if (event.ready === true && event.taken === true) {
    errors.push(errorMsg('the event was already taken'));
  }

  const valid = errors.length === 0;
  return { errors, valid };
}

export const freeEventValidation = (state, action) => {
  var errors = [];
  const { eventId } = action;
  const event = state.event.eventById[eventId];
    
  if (event === undefined) {
    errors.push(errorMsg('the event doesn\'t exists'));
  }
  if (event.ready === false) {
    errors.push(errorMsg('there are other actions taking place'));
  }
  if (event.ready === true && event.taken === true) {
    errors.push(errorMsg('the event was already taken'));
  }

  const valid = errors.length === 0;
  return { errors, valid };
}
