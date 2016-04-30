'use strict';

import _ from 'underscore';
import logJSON from '../../logJSON';
import initialState, { createCalendar } from './initialState';

import { 
  GET_EVENTS, 
  TAKE_EVENT, 
  FREE_EVENT, 
  CLEAR_EVENT_ERRORS,
  CHANGE_SLOT_SIZE,
} from './actionTypes';

export default (state = initialState, action = {}) => {
  const { type, ready, result, errors, hasErrors } = action;
  logJSON(type, "calendar.reducer [started]");
  logJSON(action, "calendar.reducer [started]");
  
  switch(type) {
    
    case GET_EVENTS:
      if (ready && result) {
        const { events , slots, resources } = result;
        const { slotSize, slotSizes } = state;
        state = createCalendar(events, slots, resources, ready)
          .set('slotSize', slotSize)
          .set('slotSizes', slotSizes);
      }
      state = state.merge({ready, errors});
      break;
      
    case TAKE_EVENT:
    case FREE_EVENT:  
    case CLEAR_EVENT_ERRORS:    
      const { eventId } = action;
      let event = state.eventById.get(eventId);
      if (ready && result) {
        const serverId = result.id;
        const taken = serverId !== undefined;
        event = event.merge({taken, serverId});
      }
      event = event.merge({ready, errors});
      state = state.setIn(['eventById',eventId],event);
      break;
    
    case CHANGE_SLOT_SIZE:
      const { slotSize } = action;
      state = state.set('slotSize', slotSize);
      break;
  }
  logJSON(type, "calendar.reducer [finished]");
  
  return state;
}

