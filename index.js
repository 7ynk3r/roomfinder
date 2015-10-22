

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
  ListView,
  ActivityIndicatorIOS,
  Animated,
  Image,
} = React;
var Button = require('./Button');
var GoogleAPIForm = require('./googleapi.form');
var TimerMixin = require('react-timer-mixin');

class roomfinder extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      buttonState: Button.states.initial,
    };
  }
  
  _onPress() {
    console.log('_onPress %s', this.state.buttonState);
    this.setState({
      buttonState: (this.state.buttonState+1)%3
    });
  }
  
  render() {
    console.log('render[index] %s', this.state.buttonState);    

    return (
      <View 
        style={{
          flex:1,
          backgroundColor:'white',
          marginTop: 20,
      }}>


          <Image 
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            style={{
              margin: 20, 
              width: 40, 
              height: 40,
              borderRadius: 20,
          }}/>
       
       
          <Button 
            state={this.state.buttonState}
            onPress={_.bind(this._onPress, this)}
            style={{
              height:50,
              backgroundColor:'#fad165',
              borderRadius: 5,
              margin: 10,
          }}>
            PA3-Portal (Polycom - seats 6)
          </Button>
      </View>
    );
  }
  
  
}


// var roomfinder = React.createClass({
//   mixins: [TimerMixin],
  
//   getInitialState() {
//     // http://moduscreate.com/react-native-listview-with-section-headers/
//     var ds = new ListView.DataSource({
//       getSectionHeaderData : (dataBlob, sid) => dataBlob.slots[sid],
//       getRowData : (dataBlob, sid, rid) => { return {slot: dataBlob.slots[sid], resource: dataBlob.resources[rid]}; },
//       rowHasChanged : (r1, r2) => r1 !== r2,
//       sectionHeaderHasChanged : (s1, s2) => s1 !== s2
//     });
//     return {
//       modalVisible: false,
//       dataSource: ds.cloneWithRows([]),
//     };
//   },
  
//   componentDidMount: function() {
//     this.setState({
//       modalVisible: true,
//     });
//     // this._updateDataSource(mockData.groupedFreeSlotList);
//   },
  
//   _updateDataSource(data) {
//     var sortedSlots = _.sortBy(data.slots, 'start');    
//     var sortedSlotIds = _.pluck(sortedSlots, 'id');
//     var sortedResIds = _.map(sortedSlots, (s) => _.keys(s.calendars));      

//     var dataBlob = {
//       slots : _.indexBy(data.slots, 'id'),
//       resources : _.indexBy(data.resources, 'id')
//     };
    
//     this.setState({
//       dataSource: this.state.dataSource.cloneWithRowsAndSections(
//         dataBlob, 
//         sortedSlotIds, 
//         sortedResIds)
//     });
//   },
  
//   _onCode(code) {   
//     var that = this;

//     that.setState({
//       modalVisible: false,        
//     });
    
//     return that
//     ._authenticate(code)
//     .then(that._groupedFreeSlotList);
//   },
  
//   _authenticate(code) {
//     googleapi.init(
//       code,
//       secret.google.client_id,
//       secret.google.client_secret
//     );
    
//     return googleapi.authenticate();
//   },
  
//   _groupedFreeSlotList() {
//     var that = this;
//     var timeMin = new Date(2015, 9, 9, 10, 0, 0, 0);
//     var timeMax = new Date(2015, 9, 9, 20, 0, 0, 0);
//     return googleapi
//     .groupedFreeSlotList(timeMin, timeMax, 15, 30, 10)
//     .then(function(data){
//       console.log('Request succeeded with JSON response', data);
//       that._updateDataSource(data);
//     });
//   },
  
//   _onPressButton(rowData){
//     var that = this;
//     var slot = rowData.slot;
//     var calendar = rowData.resource;
//     var eventId = slot.calendars[calendar.id].eventId;
//     var insertDeleteEvent = eventId 
//     ? googleapi.deleteEvent(eventId)
//     : googleapi.insertEvent(calendar.id, 'roomfinder', slot.start, slot.end);
    
//     return insertDeleteEvent
//     .then(that._groupedFreeSlotList);
//   },
  
//   render() {
//     return (
//       <View 
//         style={styles.container}>
      
//         <Modal
//           animated={true}
//           transparent={false}
//           visible={this.state.modalVisible}>

//           <GoogleAPIForm
//             client_id={secret.google.client_id}
//             onCode={this._onCode}/>
            
//         </Modal>
        
//         <ListView
//           ref="listView"
//           initialListSize={50}
//           dataSource={this.state.dataSource}
//           automaticallyAdjustContentInsets={false}
//           keyboardShouldPersistTaps={true}
//           showsVerticalScrollIndicator={false}
//           renderSectionHeader = {(sectionData) =>
//             <Text style={styles.section}>
//               {sectionData.start.toLocaleTimeString() + ' - ' + sectionData.end.toLocaleTimeString()}
//             </Text>
//           }
//           renderRow = {(rowData) => 
//             <TouchableHighlight 
//               underlayColor='#a9d9d4'
//               onPress={() => this._onPressButton(rowData)}>
//               <Text style={[styles.row, {
//                 color: rowData.resource.foregroundColor,
//                 backgroundColor : rowData.resource.backgroundColor
//               }]}>
//                 {(rowData.slot.calendars[rowData.resource.id].eventId ? "[TAKEN] " : "") + rowData.resource.summary}
//               </Text>
//             </TouchableHighlight>
//           }/>
          
//       </View>
//     );
//   },
// });

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  section : {
    padding: 15,
    marginTop: 8,
    marginBottom: 1,
    margin: 5,
    borderRadius: 10, 
    color: 'white',
    backgroundColor : 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row : {
    padding: 15,
    marginTop: 1,
    marginBottom: 1,
    margin: 5,
    borderRadius: 10,
    height: 20,
  },
});


AppRegistry.registerComponent('roomfinder', () => roomfinder);




// Valid keys: [
//   "width",
//   "height",
//   "top",
//   "left",
//   "right",
//   "bottom",
//   "margin",
//   "marginVertical",
//   "marginHorizontal",
//   "marginTop",
//   "marginBottom",
//   "marginLeft",
//   "marginRight",
//   "padding",
//   "paddingVertical",
//   "paddingHorizontal",
//   "paddingTop",
//   "paddingBottom",
//   "paddingLeft",
//   "paddingRight",
//   "borderWidth",
//   "borderTopWidth",
//   "borderRightWidth",
//   "borderBottomWidth",
//   "borderLeftWidth",
//   "position",
//   "flexDirection",
//   "flexWrap",
//   "justifyContent",
//   "alignItems",
//   "alignSelf",
//   "flex",
//   "transform",
//   "transformMatrix",
//   "backfaceVisibility",
//   "backgroundColor",
//   "borderColor",
//   "borderTopColor",
//   "borderRightColor",
//   "borderBottomColor",
//   "borderLeftColor",
//   "borderRadius",
//   "borderTopLeftRadius",
//   "borderTopRightRadius",
//   "borderBottomLeftRadius",
//   "borderBottomRightRadius",
//   "borderStyle",
//   "opacity",
//   "overflow",
//   "shadowColor",
//   "shadowOffset",
//   "shadowOpacity",
//   "shadowRadius"
// ]