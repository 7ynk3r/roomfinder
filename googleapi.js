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
      body:body
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
      return response.json();
    });
  },

  // rest calls ////////////////////////////////

  calendarList : function() {
    return this.callApi("https://www.googleapis.com/calendar/v3/users/me/calendarList", 'get');
  },

  resourcesList : function() {
    console.log("resourcesList");
    
    return this.calendarList()
    .then(function(data) {
      console.log("resourcesList data " + data);
      return _.filter(data.items, (item) => item.id.endsWith('@resource.calendar.google.com'));
    });
  },
  
  insertEvent: function(calendarId, summary, start, end) {
    var params = {};
    params['start'] = {'dateTime': start};
    params['end'] = {'dateTime': end};
    params['attendees'] = [{'email': calendarId}];
    params['summary'] = summary;
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/primary/events', 'post', params);
  },

  deleteEvent: function(calendarId, eventId) {
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId, 'delete');
  },

  freeBusyQuery: function(start, end, calendarIds) {
    var calendars = [];
    _.each(calendarIds, (calendarId) => calendars.push({'id' : calendarId}));

    var params = {};
    // params['kind'] = 'calendar#freeBusy';
    params['timeMin'] = start;
    params['timeMax'] = end;
    params['items'] = calendars;
    return this.callApi('https://www.googleapis.com/calendar/v3/freeBusy', 'post', params);
  },
  
  
  // business calls ////////////////////////////////
  
  freeSlotList : function(timeMin, timeMax, stepSize, slotSize, slotsMax) {
    console.log("freeSlotList");
    
    var that = this;
    
    return that
    .resourcesList()
    .then(function(rs) {
      console.log("freeSlotList rs " + rs)
      return _.map(rs, (r) => r.id);
    })
    .then(function(items) {
      console.log("freeSlotList items " + items)
      return that.freeBusyQuery(timeMin, timeMax, items);
    })
    .then(function(slots) {
      var timeMin = slots.timeMin;
      var timeMax = slots.timeMax;
      var calendars = slots.calendars;
      
      for(var calendarKey in calendars) {
        calendars[calendarKey] = {
          available : that.freeSlotListForCalendar(
            slots.timeMin,
            slots.timeMax,
            calendars[calendarKey].busy,
            stepSize,
            slotSize,
            slotsMax)
        };
      }
            
      return slots;
    });
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
          || (end > b.start && end <= b.end);
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
  }


}

module.exports = new GoogleAPI();
