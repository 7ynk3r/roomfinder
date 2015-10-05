'use strict';

// Non-components
var secret = require('./secret');
var mockData = require('./mockData');
var googleapi = require('./googleapi');
var _ = require('underscore');

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
    // http://moduscreate.com/react-native-listview-with-section-headers/
    var ds = new ListView.DataSource({
      getSectionHeaderData : (dataBlob, sid) => dataBlob.slots[sid],
      getRowData : (dataBlob, sid, rid) => dataBlob.resources[rid],
      rowHasChanged : (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2
    });
    return {
      modalVisible: false,
      dataSource: ds.cloneWithRows([]),
    };
  },
  
  componentDidMount: function() {
    // this.setState({
    //   modalVisible: true,
    // });
    this._updateDataSource(mockData.groupedFreeSlotList);
  },
  
  _updateDataSource(data) {
    var sortedSlots = _.sortBy(data.slots, 'start');    
    var soterdSlotIds = _.map(sortedSlots, (s) => s.id);
    var sortedResIds = _.map(sortedSlots, (s) => s.calendarIds);      
    var dataBlob = {
      slots : _.indexBy(data.slots, 'id'),
      resources : _.indexBy(data.resources, 'id')
    };
    
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        dataBlob, 
        soterdSlotIds, 
        sortedResIds)
    });
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
      var timeMin = new Date(2015, 9, 9, 10, 0, 0, 0);
      var timeMax = new Date(2015, 9, 9, 20, 0, 0, 0);
      return googleapi.groupedFreeSlotList(timeMin, timeMax, 30, 60, 2);
    })
    .then(function(data){
      console.log('Request succeeded with JSON response', data);
      that._updateDataSource(data);
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
          renderSectionHeader = {(sectionData) =>
            <Text style={styles.section}>
              {sectionData.start.toLocaleTimeString() + ' - ' + sectionData.end.toLocaleTimeString()}
            </Text>
          }
          renderRow = {(rowData) => 
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
  section : {
    padding: 10,
    marginTop: 8,
    marginBottom: 2,
    margin: 4,
    borderRadius: 3, 
    color: 'white',
    backgroundColor : 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row : {
    padding: 10,
    marginTop: 0,
    marginBottom: 2,
    margin: 4,
    borderRadius: 3, 
  },
});


AppRegistry.registerComponent('roomfinder', () => roomfinder);
