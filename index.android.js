/**
 * Sample React Native App: david
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} = React;

var LoginModule = require('LoginModule');

var EventEmitter = require('EventEmitter');
var test = require('Subscribable');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var secret = require('./secret');
var googleapi = require('./googleapi');
var _ = require('underscore');

var roomfinder = React.createClass({
  mixins: [test.Mixin],

  componentWillMount: function() {
    this.addListenerOn(RCTDeviceEventEmitter,
                      'login',
                      this.scrollResponderKeyboardWillShow);
  },

  scrollResponderKeyboardWillShow:function(e: Event) {
      console.log('------------------>' + JSON.stringify(e) + ' - code: ' + e.code);
      var code = e.code;
      var clientId = secret.google.client_id;
      var clientSecret = secret.google.client_secret;
      
      googleapi.init(code, clientId, clientSecret);

      googleapi.authenticate()
      .then(function() {
            console.log('----> resourcesList');
              return googleapi.resourcesList()
            })
      .then(function(items) {
        var filter = _.filter(data.items, (item) => item.id.endsWith('@resource.calendar.google.com'));

        console.log(items);
        // console.log('nextPageToken:' + data.nextPageToken); 
        // console.log('kind:' + data.kind); 
        // console.log('data.items.length:' + data.items.length); 
        // for (var i = 0 ; i < data.items.length ; i++) {
        //   var item = data.items[i];
        //   if (item.id.endsWith('@resource.calendar.google.com')) {
        //     console.log(item.summary);
        //   }
        // }
        // console.log(data); 
      });

  },

  render: function() {
    return (
            <TouchableWithoutFeedback
              onPress={() =>
                LoginModule.login(
                  secret.google.client_id, 
                  (successCallback) => {
                    console.log(successCallback.code);
                  })
                }>
              <Text style={styles.text}>Click me to LogIn.</Text>
            </TouchableWithoutFeedback>
        );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: 'black',
  },
});

AppRegistry.registerComponent('roomfinder', () => roomfinder);
