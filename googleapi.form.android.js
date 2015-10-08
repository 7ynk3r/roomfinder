'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  WebView,
  ListView,
} = React;
var urlparser = require('./urlparser');
var Subscribable = require('Subscribable');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var LoginModule = require('LoginModule');

var LoginView = React.createClass({
  mixins: [Subscribable.Mixin],

  propTypes: { 
    client_id: React.PropTypes.string.isRequired,
    onCode: React.PropTypes.func.isRequired,
  },

  componentWillMount: function() {
    var that = this;
    this.addListenerOn(RCTDeviceEventEmitter,
                      'login',
                      function(e) {
                        that.props.onCode(e.code);
                      });
  },

  componentDidMount: function() {
    LoginModule.login(
          this.props.client_id);
  },

  render() {
    return (
      <View/>
    );
  }
});

var styles = StyleSheet.create({
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
});

module.exports = LoginView;
