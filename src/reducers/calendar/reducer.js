'use strict';

export const logJSON = (json, msg='json') => console.log(`${msg}: ${JSON.stringify(json)} \n`) ;

// import * as actions from './actions'
import _ from 'underscore';
import { GET_EVENTS, TAKE_EVENT, FREE_EVENT } from './actionTypes';
import initialState, { createCalendar } from './initialState';

export const calendar = (state = initialState, action = {}) => {
  const { type, ready, result, errors } = action;
  logJSON(action, 'action');
  
  switch(type) {
    
    case GET_EVENTS:
      if (ready && result) {
        const { events , slots, resources } = result;
        state = createCalendar(events, slots, resources, ready);
      }
      else if (ready && errors) {
        state = state.merge({errors});
      }
      return state.merge({ready});
      
    case TAKE_EVENT:
    case FREE_EVENT:
      
      const { eventId } = action;
      const taken = type == TAKE_EVENT;
      let event = state.eventById.get(eventId);
      if (ready && result) {
        // logJSON(event);
        const serverId = result.eventId !== undefined ? result.eventId : 0;
        event = event
          .delete(errors)
          .merge({taken, serverId});
      }
      else if (ready && errors) {
        event = event.merge({errors});
      }
      event = event.merge({ready});
      return state.setIn(['eventById',eventId],event);
  }
  
  return state;
}


// export default calendar;