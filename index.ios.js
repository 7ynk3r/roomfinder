/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
} = React;
var urlParser = require('./urlParser');
var secret = require('./secret');

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor='#a9d9d4'>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var roomfinder = React.createClass({
  getInitialState() {
    return {
      modalVisible: false,
      url: 'https://accounts.google.com/o/oauth2/auth?client_id=' + secret.google.client_id + '&redirect_uri=http%3A%2F%2Flocalhost&response_type=code&scope=email%20openid%20profile',
    };
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },
  
  onNavigationStateChange(navState) {
    // alert(JSON.stringify(URLL.parse(navState.url)));
    // alert(navState.url);
    
    var parsed_url = urlParser.parse(navState.url);
    
    if (parsed_url.path === 'http://localhost/') {
      // ganamos!
      this.setState({
        modalVisible: false,        
      });
    }
    
    // return false;
    // this.setState({
    //   backButtonEnabled: navState.canGoBack,
    //   forwardButtonEnabled: navState.canGoForward,
    //   url: navState.url,
    //   status: navState.title,
    //   loading: navState.loading,
    //   scalesPageToFit: true
    // });
  },
  
  // onLoadingError() {
  //   alert("renderError");

  //   return false;
  // },
  
  renderError() {
    return (<View/>);
  },

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <View>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.modalVisible}>

          <WebView
            ref={this.state.url}
            automaticallyAdjustContentInsets={false}
            style={styles.webView}
            url={this.state.url}
            javaScriptEnabledAndroid={true}
            onNavigationStateChange={this.onNavigationStateChange}
            onLoadingError={this.onLoadingError}
            renderError={this.renderError}
            startInLoadingState={true}
            scalesPageToFit={true}/>
            
        </Modal>


        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>
      </View>
    );
  },
});


var BGWASH = 'rgba(255,255,255,0.8)';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },  
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
});


/*
var roomfinder = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
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
});
*/

AppRegistry.registerComponent('roomfinder', () => roomfinder);
