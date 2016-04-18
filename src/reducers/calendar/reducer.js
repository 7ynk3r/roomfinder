'use strict';

import _ from 'underscore';
import logJSON from '../../logJSON';
import initialState from './initialState';

import {
  GET_CALENDARS,
} from './actionTypes';

export default (state = initialState, action = {}) => {
  const { type, ready, result, errors, hasErrors } = action;
  logJSON(type, "calendar.reducer [started]");
  logJSON(action, "calendar.reducer [started]");

  switch(type) {

    case GET_CALENDARS:
      if (ready && result) {
        const { events , slots, resources } = result;
        const { slotSize, slotSizes } = state;
        state = createCalendar(events, slots, resources, ready)
          .set('slotSize', slotSize)
          .set('slotSizes', slotSizes);
      }
      state = state.merge({ready, errors});
      break;
  }

  return state;
}
