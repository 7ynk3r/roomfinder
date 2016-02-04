'use strict';

import logJSON from '../../logJSON'

import { GET_EVENTS, TAKE_EVENT, FREE_EVENT, CHANGE_SLOT_SIZE } from './actionTypes';
// import googleapi from '../../lib/googleapi'
import { _promiseActionThunk, _makeReadyAction} from '../common/actions.js'
// import secret from  require('./secret');

import getEventsMockData from '../../__mocks__/googleapi-org'



const delay = time => new Promise(fulfill => {
  setTimeout(fulfill, time);
});


export const _getEvents = () => {
  return {
    type: GET_EVENTS
  };
}

export const getEvents = () => {
  const action = _getEvents();
  const timeMin = new Date(2015, 9, 9, 10, 0, 0, 0);
  const timeMax = new Date(2015, 9, 9, 20, 0, 0, 0);
  const promise = undefined; //googleapi.groupedFreeSlotList(timeMin, timeMax, 15, 30, 10);
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


export const changeSlotSize = slotSize => {
  return {
    type: CHANGE_SLOT_SIZE,
    slotSize
  };
}

// export const changeSlotSize = slotSize => {
//   const action = _changeSlotSize(slotSize);
//   const promise = undefined;
//   return _promiseActionThunk(promise, action);
// }


// mocks

export const _getEventsMock = () => {
  const action = _getEvents();
  const promise = delay(100).then(()=>Promise.resolve(getEventsMockData));
  return _promiseActionThunk(promise, action);
};

export const _takeEventMock = eventId => {
  const action = _takeEvent(eventId);
  const result = { id : 1 };
  const promise = delay(2000).then(()=>Promise.resolve(result));
  return _promiseActionThunk(promise, action);
}

export const _freeEventMock = eventId => {
  const action = _freeEvent(eventId);
  const result = { id : 0 };
  logJSON(result, '<<<<');
  const promise = delay(2000).then(()=>Promise.resolve(result));
  return _promiseActionThunk(promise, action);
}
