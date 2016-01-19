'use strict';

import logJSON from '../../logJSON';
import _ from 'underscore';
import { Record, List, Map } from 'immutable';

// Records

const Calendar = Record({
  ready : false,
  errors : List(),
  eventById : Map(), // Event record
  slotById : Map(), // Slot record
  resourceById : Map() // Resource record
  // slotIdx : List(), 
  // resourceIdx : List()
});

const Event = Record({
  ready : true,
  errors : List(),
  id : '',
  slotId : 0,
  resourceId : 0,
  serverId : 0,
  taken : false
});

const Slot = Record({
  id : 0,
  start : undefined,
  end : undefined
});

const Resource = Record({
  id : '',
  kind : '',
  etag : '',
  summary : '',
  timeZone : '',
  colorId : 0,
  backgroundColor : '#ffffff',
  foregroundColor : '#000000',
  accessRole : 'reader'
});

// Calendar creator

export const createCalendar = (events=[], slots=[], resources=[], ready=false) => {
  var events = _.each(events, (e) => {
    e.id = e.resourceId + '|' + e.slotId;
    e.taken = (e.eventId || 0) > 0;
    if (e.taken) {
      e.serverId = e.eventId;
      delete e.eventId
    }
  });
  
  _.each(slots, s => { delete s.calendars; });
  
  // Convert to records

  events = _.map(events, e => new Event(e));
  slots = _.map(slots, s => {
    s.start = new Date(s.start);
    s.end = new Date(s.end);
    return new Slot(s);
  });
  resources = _.map(resources, r => new Resource(r));
    
  // Create the entities
  
  const eventById     = Map(_.indexBy(events, 'id'));
  const slotById      = Map(_.indexBy(slots, 'id'));
  const resourceById  = Map(_.indexBy(resources, 'id'));
  // const slotIdx       = List(_.pluck(_.sortBy(slots, 'start'), 'id'));
  // const resourceIdx   = List(_.pluck(_.sortBy(resources, 'start'), 'id'));

  return new Calendar({
    ready,
    eventById, 
    slotById, 
    resourceById
    // slotIdx, 
    // resourceIdx 
  });
}

const initialState = createCalendar();

export default initialState;