'use strict';

import logJSON from '../../logJSON'
import { GET_EVENTS, TAKE_EVENT, FREE_EVENT } from './actionTypes';
import googleapi from '../../lib/googleapi'


export const _getEvents = () => {
  return {
    type: GET_EVENTS
  };
}

export const getEvents = () => {
  const action = _getEvents();
  const timeMin = new Date(2015, 9, 9, 10, 0, 0, 0);
  const timeMax = new Date(2015, 9, 9, 20, 0, 0, 0);
  const promise = googleapi.groupedFreeSlotList(timeMin, timeMax, 15, 30, 10);
  return _promiseActionThunk(promise, action);
}

export const _takeEvent = eventId => {
  return {
    type: TAKE_EVENT,
    eventId
  };
}

export const takeEvent = eventId => {
  const action = _takeEvent(eventById);
  const promise = undefined; // googleapi.insertEvent(calendarId, summary, start, end);
  return _promiseActionThunk(promise, action);
}

export const _freeEvent = eventId => {
  return {
    type: FREE_EVENT,
    eventId
  };
}

export const freeEvent = eventId => {
  const action = _freeEvent(eventById);
  const promise = undefined;
  return _promiseActionThunk(promise, action);
}
