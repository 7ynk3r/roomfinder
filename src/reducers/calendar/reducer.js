'use strict';

import _ from 'underscore';
import logJSON from '../../logJSON';
import { GET_EVENTS, TAKE_EVENT, FREE_EVENT, CHANGE_SLOT_SIZE } from './actionTypes';
import initialState, { createCalendar } from './initialState';

export default (state = initialState, action = {}) => {
  const { type, ready, result, errors } = action;
  logJSON(action, 'action<<<<<<<<<');
  
  switch(type) {
    
    case GET_EVENTS:
      if (ready && result) {
        const { events , slots, resources } = result;
        const { slotSize, slotSizes } = state;
        state = createCalendar(events, slots, resources, ready)
          .set('slotSize', slotSize)
          .set('slotSizes', slotSizes);
      }
      else if (ready && errors) {
        state = state.merge({errors});
      }
      state = state.merge({ready});
      return state;
      
    case TAKE_EVENT:
    case FREE_EVENT:      
      const { eventId } = action;
      let event = state.eventById.get(eventId);
      if (ready && result) {
        const serverId = result.id;
        const taken = (serverId||0) > 0;
        event = event
          .delete(errors)
          .merge({taken, serverId});
      }
      else if (ready && errors) {
        event = event.merge({errors});
      }
      event = event.merge({ready});
      return state.setIn(['eventById',eventId],event);
    
    case CHANGE_SLOT_SIZE:
      const { slotSize } = action;
      state = state.set('slotSize', slotSize);
      logJSON(state, 'y yyyyy')
      return state;
  }
  
  return state;
}

