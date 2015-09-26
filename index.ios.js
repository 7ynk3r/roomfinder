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
  ListView,
} = React;
var urlParser = require('./urlParser');
var secret = require('./secret');
var mockData = require('./mockData');

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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      modalVisible: false,
      url: 'https://accounts.google.com/o/oauth2/auth?client_id=' + secret.google.client_id + '&redirect_uri=http%3A%2F%2Flocalhost&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&approval_prompt=force&access_type=offline',
      // dataSource: ds.cloneWithRows([{summary:"calendar0"},{summary:"calendar1"}]),
      // dataSource: ds.cloneWithRows(mockData),
      // dataSource: ds.cloneWithRows(mockData.slice(15)),
      dataSource: ds.cloneWithRows([])
    };
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },
  
  onNavigationStateChange(navState) {   
    var that = this;
    var parsed_url = urlParser.parse(navState.url);
    
    if (parsed_url.path === 'http://localhost/') {
      // ganamos!
      that.setState({
        modalVisible: false,        
      });
      
      // https://developers.google.com/web/updates/2015/03/introduction-to-fetch?hl=en#post-request
      // https://developers.google.com/oauthplayground/
      // https://developers.google.com/identity/protocols/OAuth2WebServer?hl=en#creatingcred
      var body =           
        "code=" + parsed_url.params.code +
        "&client_id=" + secret.google.client_id + 
        "&client_secret=" + secret.google.client_secret +
        "&redirect_uri=" + "http://localhost" +
        "&grant_type=" + "authorization_code";
      
      fetch('https://www.googleapis.com/oauth2/v3/token', {  
        method: 'post',  
        headers: {  
          "Content-type" : "application/x-www-form-urlencoded",
          // "code" : parsed_url.params.code,
          // "client_id" : secret.google.client_id,
          // "client_secret" : secret.google.client_secret,
          // "redirect_uri": "http://localhost/",
          // "grant_type" : "authorization_code",
        },
        body:body
      })
      .then(function(response) {
        // Ganamos
        if (response.status == 200) {
          return response.json();
        }
      })  
      .then(function(data) {  
        console.log('Request succeeded with JSON response', data);  
        var calendarsURL = "https://www.googleapis.com/calendar/v3/users/me/calendarList"
        return fetch(calendarsURL, {
          method: 'get',  
          headers: {  
            'Authorization': 'Bearer ' + data.access_token
          }                    
        });
      })  
      .then(function(response) {
        // Ganamos
        if (response.status == 200) {
          return response.json();
        }
      })  
      .then(function(data) {  
        console.log('Request succeeded with JSON response', data);  
        that.setState({
          dataSource: that.state.dataSource.cloneWithRows(mockData),
        });
      })
      .catch(function(error) {  
        console.log('Request failed', error);  
      })
      .done();
    }
  },
  
  render() {
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
        
        <ListView
          ref="listView"
          style={styles.container}
          initialListSize={100}
          dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          renderRow={(rowData) => 
            <Text style={styles.row}>{rowData.summary}</Text>
          }
        />
        
      </View>
    );
  },
});


var BGWASH = 'rgba(255,255,255,0.8)';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerText: {
    alignItems: 'center',
  },
  row : {
    backgroundColor: '#EFEFEF',
    height: 50,
    margin: 3,
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
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
});


AppRegistry.registerComponent('roomfinder', () => roomfinder);
