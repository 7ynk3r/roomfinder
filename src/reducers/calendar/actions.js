'use strict';

import { GET_EVENTS, TAKE_EVENT, FREE_EVENT } from './actionTypes';

export const _getEvents = () => {
  return {
    type: GET_EVENTS
  };
}

export const getEvents = () => {
  var action = _getEvents();
  return promiseActionThunk(undefined, action);
}

export const _takeEvent = eventId => {
  return {
    type: TAKE_EVENT,
    eventId
  };
}

export const takeEvent = eventId => {
  var action = _takeEvent(eventById);
  return promiseActionThunk(undefined, action, takeEventValidation);
}

export const _freeEvent = eventId => {
  return {
    type: FREE_EVENT,
    eventId
  };
}

export const freeEvent = eventId => {
  var action = _freeEvent(eventById);
  return promiseActionThunk(undefined, action, freeEventValidation);
}
