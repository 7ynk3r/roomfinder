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

var TimerMixin = require('react-timer-mixin');

var secret = require('./secret');
// var mockData = require('./mockData');
var googleapi = require('./googleapi');

var GoogleAPIForm = require('./googleapi.form');

var roomfinder = React.createClass({
  mixins: [TimerMixin],
  
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      modalVisible: false,
      dataSource: ds.cloneWithRows([])
    };
  },
  
  componentDidMount: function() {
    this.setTimeout(
      () => {
        console.log("timeout!!!!");
        this.setState({
          modalVisible: true,
        });
      }, 
      500
    );
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },
  
  _onCode(code) {   
    var that = this;

    that.setState({
      modalVisible: false,        
    });
    
    googleapi.init(
      code,
      secret.google.client_id,
      secret.google.client_secret
    );
    
    googleapi
    .authenticate()
    .then(function(){
      return googleapi.calendarList();    
    })
    .then(function(data){
      console.log('Request succeeded with JSON response', data);  
      that.setTimeout(
        () => {
          that.setState({
            dataSource: that.state.dataSource.cloneWithRows(data.items),
          });
        }, 
        0
      );
    });
  },
  
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.modalVisible}>

          <GoogleAPIForm
            client_id={secret.google.client_id}
            onCode={this._onCode}/>
            
        </Modal>
        
        <ListView
          ref="listView"
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
  row : {
    backgroundColor: '#EFEFEF',
    height: 50,
    margin: 3,
  },
});


AppRegistry.registerComponent('roomfinder', () => roomfinder);
