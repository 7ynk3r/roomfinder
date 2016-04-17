'use strict';

import logJSON from '../../logJSON'
import { 
  _promiseActionThunk, 
  _dispatchPromiseAction,
  _makeReadyAction, 
  _delay
} from '../common/actions.js'
import getEventsMockData from '../../__mocks__/googleapi-org'
import googleapi from '../../lib/googleapi'
import XDate from 'xdate'

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

export const getEvents = () => (dispatch, getState) => {
  logJSON(googleapi.groupedFreeSlotList, 'getEvents');
  const state = getState();
  const action = _getEvents();
  
  
  let now = new XDate();
  // if (now.getHours()>19) {
  //   now = now.addDays(1);
  // }
  
  // For testing with a fixed date.
  // const now = new XDate('2016-12-31')
  
  logJSON(now, "\n\n\n\n\n\nnow")
  // minutes
  const minutes = Math.round(now.getMinutes()/15)*15;
  // min and max
  const timeMin = new XDate(now.setMinutes(minutes,0,0));
  const timeMax = new XDate(timeMin).addHours(4);
  // other parameters
  const stepSize = state.calendar.stepSize; 
  const slotSize = state.calendar.slotSize;
  const slotsMax = state.calendar.slotsMax;
  const promise = googleapi.groupedFreeSlotList(timeMin, timeMax, stepSize, slotSize, slotsMax);
  _dispatchPromiseAction(dispatch, promise, action);
}

export const _takeEvent = eventId => {
  return {
    type: TAKE_EVENT,
    eventId
  };
}

export const takeEvent = event => {
  const action = _takeEvent(event.id);
  const resource = event.resource.id;
  const promise = googleapi.freeBusyQuery(event.slot.start, event.slot.end, [resource])
  .then(result => {
      // validate that the slot it's available.
      const busy = result.calendars[resource].busy;
      const isBusy = Array.isArray(busy) && busy.length !== 0;
      if (isBusy) {
        return Promise.reject('The event is not available.');
      }      
      return googleapi.insertEvent(resource, "roomfinder", event.slot.start, event.slot.end);
  });
  return _promiseActionThunk(promise, action);
}

export const _freeEvent = eventId => {
  return {
    type: FREE_EVENT,
    eventId
  };
}

export const freeEvent = event => {
  const action = _freeEvent(event.id);
  const promise = googleapi.deleteEvent(event.serverId);
  return _promiseActionThunk(promise, action);
}

export const clearEventErrors = event => {
  const action = {
    type: CLEAR_EVENT_ERRORS,
    eventId : event.id,
  };
  return _makeReadyAction(action, true, undefined, []);
}

export const _changeSlotSize = slotSize => {
  return {
    type: CHANGE_SLOT_SIZE,
    slotSize
  };
}

export const changeSlotSize = slotSize => (dispatch, getState) => {
  const action = _changeSlotSize(slotSize);
  dispatch(action);
  getEvents();
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

