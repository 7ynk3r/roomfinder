'use strict';

import logJSON from '../../logJSON'
import { _promiseActionThunk, _makeReadyAction, _delay} from '../common/actions.js'
import getEventsMockData from '../../__mocks__/googleapi-org'
import googleapi from '../../lib/googleapi'

import { 
  GET_EVENTS, 
  TAKE_EVENT, 
  FREE_EVENT, 
  CLEAR_EVENT_ERRORS,
  CHANGE_SLOT_SIZE,
} from './actionTypes';

export const _getEvents = () => {
  return {
    type: GET_EVENTS
  };
}

export const getEvents = () => {
  logJSON(googleapi.groupedFreeSlotList, 'getEvents');
  const action = _getEvents();
  const now = new Date();
  const timeMin = new Date(now.setHours(6,0,0,0));
  const timeMax = new Date(now.setHours(20,0,0,0));
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
  const action = _takeEvent(eventId);
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
  const action = _freeEvent(eventId);
  const promise = undefined;
  return _promiseActionThunk(promise, action);
}

export const clearEventErrors = eventId => {
  const action = {
    type: CLEAR_EVENT_ERRORS,
    eventId
  };
  return _makeReadyAction(action, true, undefined, []);
}

export const changeSlotSize = slotSize => {
  return {
    type: CHANGE_SLOT_SIZE,
    slotSize
  };
}

// mocks

export const _getEventsMock = () => {
  logJSON('_getEventsMock');
  const action = _getEvents();
  const promise = _delay(500).then(()=>Promise.resolve(getEventsMockData));
  return _promiseActionThunk(promise, action);
};

export const _takeEventMock = eventId => {
  const action = _takeEvent(eventId);
  // const result = { id : 1 };
  // const promise = _delay(2000).then(()=>Promise.resolve(result));
  const error = {};
  const promise = _delay(2000).then(()=>Promise.error(error));
  return _promiseActionThunk(promise, action);
}

export const _freeEventMock = eventId => {
  const action = _freeEvent(eventId);
  const result = { id : 0 };
  logJSON(result, '<<<<');
  const promise = _delay(2000).then(()=>Promise.resolve(result));
  return _promiseActionThunk(promise, action);
}

