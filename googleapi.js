'use strict';

var _ = require('underscore');
var GoogleAPI = function() {}

GoogleAPI.prototype = {

  init : function(code, client_id, client_secret) {
    this.code = code;
    this.client_id = client_id;
    this.client_secret = client_secret;
  },

  // base ////////////////////////////////

  authenticate : function() {
    var that = this;
    var body = 
      "code=" + this.code +
      "&client_id=" + this.client_id + 
      "&client_secret=" + this.client_secret +
      "&redirect_uri=" + "http://localhost" +
      "&grant_type=" + "authorization_code";
    
    return fetch('https://www.googleapis.com/oauth2/v3/token', {  
      method: 'post',  
      headers: {  
        "Content-type" : "application/x-www-form-urlencoded",
      },
      body:body,
      cache:'no-store,no-cache'
    })
    .then(function(response) {
      return response.json();
    })  
    .then(function(data) {  
      console.log('Request succeeded with JSON response', JSON.stringify(data));  
      that.access_token = data.access_token;
      that.authorization = 'Bearer ' + data.access_token;
    });
  },

  callApi: function(url, methodName, body) {
    var bodyParams = body ? JSON.stringify(body) : null;

    console.log('--------------> calling API [' + methodName + ']' + url + ' with body: ' + bodyParams);

    return fetch(url, {
      method: methodName,  
      headers: {  
        'Authorization': this.authorization,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: bodyParams
    })
    .then(function(response) {  
      console.log('--------------> finished [' +response.status + '] API [' + methodName + ']' + url + ' with body: ' + bodyParams);
      return methodName === 'delete' ? response : response.json();
    });
  },

  // rest calls ////////////////////////////////

  calendarList : function() {
    return this.callApi("https://www.googleapis.com/calendar/v3/users/me/calendarList", 'get');
  },

  resourcesList : function() {
    console.log("resourcesList");
    var that = this;

    return this.calendarList()
    .then(function(data) {
      console.log("resourcesList data " + data);
      return _.filter(data.items, (item) => that.isResourceEmail(item.id));
    });
  },

  listEvents: function(timeMin, timeMax) {
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + timeMin.toJSON() + '&timeMax=' + timeMax.toJSON(), 'get');
  },
  
  insertEvent: function(calendarId, summary, start, end) {
    var params = {};
    params['start'] = {'dateTime': start};
    params['end'] = {'dateTime': end};
    params['attendees'] = [{'email': calendarId}];
    params['summary'] = summary;
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/primary/events', 'post', params);
  },

  deleteEvent: function(eventId) {
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/primary/events/' + eventId, 'delete');
  },

  freeBusyQuery: function(start, end, calendarIds) {
    var calendars = [];
    _.each(calendarIds, (calendarId) => calendars.push({'id' : calendarId}));

    var params = {};
    params['timeMin'] = start;
    params['timeMax'] = end;
    params['items'] = calendars;
    return this.callApi('https://www.googleapis.com/calendar/v3/freeBusy', 'post', params);
  },
  
  
  // business calls ////////////////////////////////
  
  freeSlotList : function(timeMin, timeMax, stepSize, slotSize, slotsMax) {
    console.log("freeSlotList");
    
    var that = this;
    var context = {};
    
    return that
    .resourcesList()
    .then(function(rs) {
      console.log("freeSlotList rs " + rs)
      context.resources = rs;
      return _.map(rs, (r) => r.id);
    })
    .then(function(items) {
      console.log("freeSlotList items " + JSON.stringify(items));
      return that.freeBusyQuery(timeMin, timeMax, items);
    })
    .then(function(slots) {
      var timeMin = slots.timeMin;
      var timeMax = slots.timeMax;
      var calendars = slots.calendars;
      
      for(var calendarId in calendars) {
        calendars[calendarId] = {
          available : that.freeSlotListForCalendar(
            slots.timeMin,
            slots.timeMax,
            calendars[calendarId].busy,
            stepSize,
            slotSize,
            slotsMax)
        };
      }
      
      return slots;
    })
    .then(function(slots) {
      var resources = context.resources;
      return that
        .listEvents(timeMin, timeMax)
        .then(function(events) {
          var primaryCalendarId = events.summary;
          var ownedEventItems = _.filter(events.items, (event) => event.creator && primaryCalendarId === event.creator.email);          

          _.each(ownedEventItems, (event) => {
            // resource contains a meeting room that accepted the event of the primary user.
            var resource = that.getAcceptedResource(event);
            if (resource) {
              var resourceEmail = resource.email;
              if (!slots.calendars[resourceEmail]) {
                slots.calendars[resourceEmail] = {};
              }
              var takenSlots = slots.calendars[resourceEmail]['taken'];
              if (!takenSlots) takenSlots = [];
              takenSlots.push({
                start: new Date(event.start.dateTime),
                end: new Date(event.end.dateTime),
                eventId: event.id
              });
              slots.calendars[resourceEmail]['taken'] = takenSlots;

              // Adds the resource if it is not included into the resources list yet.
              if (!_.find(resources, (rs) => rs.id == resourceEmail)) {
                resources.push({
                  id: resourceEmail,
                  summary: resource.displayName
                });
              }
            }
          });
        
          var result = {
            resources : resources,
            slots : slots
          };

          return result;
        });
    });
  },

  // Searchs for a resournce (or meeting room) that have accepted the event.
  getAcceptedResource: function(event) {
    var that = this;
    return _.find(event.attendees, (attendee) => {
      return (that.isResourceEmail(attendee.email) && attendee.responseStatus == 'accepted');
    });
  },

  isResourceEmail: function(email) {
    return email.endsWith('@resource.calendar.google.com');
  },
  
  freeSlotListForCalendar : function(timeMin, timeMax, busy, stepSize, slotSize, slotsMax) {
    var timeMin = new Date(timeMin);
    var timeMax = new Date(timeMax);
    var mins = 60000;
    var available = []; // return;
    
    // create a new busy with dates
    busy = _.map(busy, (b) => {
      return {
        start : new Date(b.start),
        end : new Date(b.end)
      };
    });
    // No busy
    if (busy.length < 1) {
      busy = [{
        end : timeMax,
        start : timeMax
      }];
    }
    
    for (var start = timeMin; start < timeMax && available.length < slotsMax; start = new Date(start.getTime() + stepSize * mins)) {
      var end = new Date(start.getTime() + slotSize * mins);
      var isBusy = _.some(busy, function(b) {
        return (start >= b.start && start < b.end)
          || (end > b.start && end <= b.end)
          || (b.start >= start && b.start < end)
          || (b.end > start && b.end <= end);
      });
      // If available add it to the list.
      if (!isBusy) {
        available.push({
          start : start,
          end : end
        });
      }
      
    }
    return available; 
  },
    
  groupedFreeSlotList : function(timeMin, timeMax, stepSize, slotSize, slotsMax) {
    
    return this
    .freeSlotList(timeMin, timeMax, stepSize, slotSize, slotsMax)
    .then(function(freeBusy) {
      var slots = freeBusy.slots;
      var calendarsSlots = slots.calendars;      
      var indexedSlots = {};
      _.each(calendarsSlots, (calendarSlots, calendarId) => {
        _.each((calendarSlots.available||[]).concat(calendarSlots.taken||[]), (slot) => {
          // Add the time as the id.
          var slotId = slot.start.getTime();
          var gslot = indexedSlots[slotId];
          // Push the slot
          if (!gslot) {
            gslot = _.pick(slot, 'start', 'end');
            gslot.id = slotId;
            gslot.calendars = {};
            indexedSlots[slotId] = gslot;
          }
          gslot.calendars[calendarId] = {eventId:slot.eventId};
        });
      });

      return {
        slots : _.values(indexedSlots),
        resources : freeBusy.resources
      };
    });
  }


}

module.exports = new GoogleAPI();
