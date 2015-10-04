'use strict';

// Non-components
var secret = require('./secret');
var mockData = require('./mockData');
var googleapi = require('./googleapi');

// Components 
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
var GoogleAPIForm = require('./googleapi.form');
var TimerMixin = require('react-timer-mixin');

var roomfinder = React.createClass({
  mixins: [TimerMixin],
  
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      modalVisible: false,
      dataSource: ds.cloneWithRows([]),
    };
  },
  
  componentDidMount: function() {
    this.setState({
      modalVisible: true,
    });
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows(mockData),
    // });    
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
    // .then(function(){
    //   var timeMin = new Date(2015, 9, 9,  1, 0, 0, 0);
    //   var timeMax = new Date(2015, 9, 9, 23, 0, 0, 0);
    //   return googleapi.freeSlotList(timeMin, timeMax, 30, 60, 2);
    // })
    // .then(function(data){
    //   console.log('Request succeeded with JSON response', data);
    //   that.setState({
    //     dataSource: that.state.dataSource.cloneWithRows(data),
    //   });
    // });
   
    // .then(function(){
    //   return googleapi.resourcesList();    
    // })
    // .then(function(data){
    //   console.log('Request succeeded with JSON response', data);  
    //   that.setState({
    //     dataSource: that.state.dataSource.cloneWithRows(data),
    //   });
    // });
    
    .then(function(){
      return googleapi.calendarList();    
    })
    .then(function(data){
      console.log('Request succeeded with JSON response', data);  
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(data.items),
      });
    });
  },
  
  render() {
    return (
      <View 
        style={styles.container}>
      
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
          initialListSize={50}
          dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          renderRow={(rowData) => 
            <Text style={[styles.row, {
              color: rowData.foregroundColor,
              backgroundColor : rowData.backgroundColor
            }]}>
              {rowData.summary}
            </Text>
          }/>
          
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  row : {
    padding: 10,
    margin: 3,
    borderRadius: 3, 
  },
});


AppRegistry.registerComponent('roomfinder', () => roomfinder);
