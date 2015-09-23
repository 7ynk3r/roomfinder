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


var roomfinder = React.createClass({
  mixins: [test.Mixin],

  componentWillMount: function() {
    this.addListenerOn(RCTDeviceEventEmitter,
                      'login',
                      this.scrollResponderKeyboardWillShow);
  },

  scrollResponderKeyboardWillShow:function(e: Event) {
      console.log('------------------>' + JSON.stringify(e));
  },

  render: function() {
    return (
            <TouchableWithoutFeedback
              onPress={() =>
                LoginModule.login(
                  secret.google.client_id, 
                  (successCallback) => {
                    console.log(successCallback);
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
