'use strict';

var _ = require('underscore');

var GoogleAPI = function() {}

GoogleAPI.prototype = {

  init : function(code, client_id, client_secret) {
    this.code = code;
    this.client_id = client_id;
    this.client_secret = client_secret;
  },

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
      //TODO: complete this field somehow.
      that.userEmail = 'COMPLETE_HERE';
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
    });
  },

  calendarList : function() {
    return this.callApi("https://www.googleapis.com/calendar/v3/users/me/calendarList", 'get')  
    .then(function(response) {
      return response.json();
    });
  },

  resourcesList : function() {
    return this.calendarList()
    .then(function(data) {
      return _.filter(data.items, (item) => item.id.endsWith('@resource.calendar.google.com'));
      });
  },

  insertEvent: function(calendarId, summary, start, end) {
    var params = {};
    params['start'] = {'dateTime': start};
    params['end'] = {'dateTime': end};
    params['attendees'] = [{'email': calendarId}];
    params['summary'] = summary;
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/' + userEmail + '/events', 'post', params);
  },

  deleteEvent: function(calendarId, eventId) {
    return this.callApi('https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events/' + eventId, 'delete');
  },

  freeBusy: function(calendarIds, start, end) {
    var calendars = [];
    _.each(calendarIds, (calendarId) => calendars.push({'id' : calendarId}));

    var params = {};
    params['kind'] = 'calendar#freeBusy';
    params['timeMin'] = start;
    params['timeMax'] = end;
    params['items'] = calendars;
    return this.callApi('https://www.googleapis.com/calendar/v3/freeBusy', 'post', params);
  }

}

module.exports = new GoogleAPI();
