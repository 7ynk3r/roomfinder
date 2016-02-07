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
var urlparser = require('../lib/urlparser');

var Login = React.createClass({
  
  propTypes: { 
    client_id: React.PropTypes.string.isRequired,
    onCode: React.PropTypes.func.isRequired,
  },

  onNavigationStateChange(navState) {   
    var parsed_url = urlparser.parse(navState.url);        
    if (parsed_url.path === 'http://localhost/') {      
       this.props.onCode(parsed_url.params.code);
    }
  },

  render() {
    var authorization_url 
    = 'https://accounts.google.com/o/oauth2/auth' 
    + '?client_id=' + this.props.client_id 
    + '&redirect_uri=' + 'http%3A%2F%2Flocalhost' 
    + '&response_type=' + 'code'
    + '&scope=' + 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar' 
    + '&access_type=' + 'offline';

    return (
      <WebView
        url={authorization_url}
        style={styles.webView}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabledAndroid={true}
        onNavigationStateChange={this.onNavigationStateChange}
        renderError={this.renderError}
        startInLoadingState={true}
        scalesPageToFit={true}/>
    );
  }
});

var styles = StyleSheet.create({
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
});

exports.module = LoginView;
