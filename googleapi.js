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
    });
  },
  
  calendarList : function() {
    return fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
      method: 'get',  
      headers: {  
        'Authorization': this.authorization
      }                    
    })  
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

  insertEvent: function() {
    return 1;
  },

  deleteEvent: function() {
    return 1;
  },

  freeBusy: function() {
    return 1;
  }

}

module.exports = new GoogleAPI();
