// TODO
// - change dataBlob dictionaries to array
// - simplify the data structure for dataBlob, it's hard to find changes.
// -- slots, calendars, calendar_x_slot(+state) => [{slotId, [{calId, calState}]}]
// - find an easy way to clone dataBlob and intruduce changes.
// - remove the checking for changes in the button after the previous changes.
// - intruduce the error into the state.
// - fix rowHasChanged by comparing just the state.



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

// class roomfinder extends React.Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       buttonState: Button.states.final,
//     };
//   }
  
//   _onPress() {
//     console.log('_onPress %s', this.state.buttonState);
//     this.setState({
//       buttonState: (this.state.buttonState+1)%3
//     });
//   }
  
//   render() {
//     console.log('render[index] %s', this.state.buttonState);    
//     return (
//       <View 
//         style={{
//           flex:1,
//           backgroundColor:'white',
//           marginTop: 20,
//       }}> 
//         <Image 
//           source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
//           style={{
//             margin: 20, 
//             width: 40, 
//             height: 40,
//             borderRadius: 20,
//         }}/>
     
     
//         <Button 
//           state={this.state.buttonState}
//           onPress={_.bind(this._onPress, this)}
//           style={{
//             height:50,
//             backgroundColor:'#fad165',
//             borderRadius: 5,
//             margin: 10,
//         }}>
//           PA3-Portal (Polycom - seats 6)
//         </Button>
//       </View>
//     );
//   }  
// }


var roomfinder = React.createClass({
  mixins: [TimerMixin],
  
  getInitialState() {
    // http://moduscreate.com/react-native-listview-with-section-headers/
    var ds = new ListView.DataSource({
      getSectionHeaderData : (dataBlob, sid) => { 
        return dataBlob.slots[sid]; 
      },
      getRowData : (dataBlob, sid, rid) => { 
        var reservationId = sid+rid;
        return {
          slot: dataBlob.slots[sid], 
          resource: dataBlob.resources[rid],
          // reservation: dataBlob.reservations[reservationId]
          event: dataBlob.events[sid][rid]
        }; 
      },
      rowHasChanged : (r1, r2) => { 
        var rowHasChanged 
          = r1.slot.id !== r2.slot.id
          || r1.resource.id !== r1.resource.id
          || r1.reservation !== r2.reservation;
        return rowHasChanged;
      },
      sectionHeaderHasChanged : (s1, s2) => { 
        return s1.id !== s2.id;
        // return true;
      }
    });
    return {
      modalVisible: false,
      dataSource: ds.cloneWithRows([]),
    };
  },
  
  componentDidMount: function() {
    this.setState({
      modalVisible: false,
    });
    this._setDataSource(mockData.dataSource);
  },
  
  _updateDataSource(dataBlob) {    
    // Sort all slotId using start.
    var sortedSlotIds = _.sortBy(_.allKeys(dataBlob.events), (si) => 
      dataBlob.slots[si].start);
    // Map each slotId to an array of resourceId, sorted by 'summary'.
    var sortedResIds = _.map(sortedSlotIds, (si) => 
      _.sortBy(_.allKeys(dataBlob.events[si]), (ri) => 
        dataBlob.resources[ri].summary));
    
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(
        dataBlob, 
        sortedSlotIds, 
        sortedResIds),
      dataBlob : dataBlob
    });
  },
   
  _setDataSource(data) {
    
    _.mapObject(_.groupBy(data.events, 'slotId'), (es) => _.indexBy(es, 'resourceId'));

    var dataBlob = {
      slots : _.indexBy(data.slots, 'id'),
      resources : _.indexBy(data.resources, 'id'),
      events : _.mapObject(_.groupBy(data.events, 'slotId'), (es) => _.indexBy(es, 'resourceId')),
      // // TODO: Replace this with events everywhere.
      // reservations : {
      //   // TODO: Remove these lines!
      //   "1444410000000medallia.com_2d3933373537323832363530@resource.calendar.google.com":2,
      //   "1444410900000medallia.com_2d3933373537323832363530@resource.calendar.google.com":1
      // }
    };
    
    this._updateDataSource(dataBlob);
  },
  
  _onCode(code) {   
    var that = this;

    that.setState({
      modalVisible: false,        
    });
    
    return that
    ._authenticate(code)
    .then(that._groupedFreeSlotList);
  },
  
  _authenticate(code) {
    googleapi.init(
      code,
      secret.google.client_id,
      secret.google.client_secret
    );
    
    return googleapi.authenticate();
  },
  
  _groupedFreeSlotList() {
    var that = this;
    var timeMin = new Date(2015, 9, 9, 10, 0, 0, 0);
    var timeMax = new Date(2015, 9, 9, 20, 0, 0, 0);
    return googleapi
    .groupedFreeSlotList(timeMin, timeMax, 15, 30, 10)
    .then(function(data){
      console.log('Request succeeded with JSON response', data);
      that._setDataSource(data);
    });
  },
  
  _onPressButton(rowData){
    // console.log('_onPress %s', rowData.reservation);
    // rowData.reservation = ((rowData.reservation||0)+1)%3;
    // console.log('_onPress %s', rowData.reservation);
    
    var sid = rowData.slot.id;
    var rid = rowData.resource.id;    
    // New data blob updating only the event.
    var dataBlob = _.clone(this.state.dataBlob);
    
    // Depth copy of events.
    dataBlob.events = JSON.parse(JSON.stringify(dataBlob.events));
    // Look for the event and update the state.
    dataBlob.events[sid][rid].state = ((dataBlob.events[sid][rid].state||0)+1)%3;
    
    this._updateDataSource(dataBlob);
  },
  
  render() {
    var calendarState = 1;
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
        
        <View>
          <Text style={styles.section}>
            {'hola mundo'}
          </Text>
        </View>
        
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
          renderRow = {(rowData) => {
            // <TouchableHighlight 
            //   underlayColor='#a9d9d4'
            //   onPress={() => this._onPressButton(rowData)}>
            //   <Text style={[styles.row, {
            //     color: rowData.resource.foregroundColor,
            //     backgroundColor : rowData.resource.backgroundColor
            //   }]}>
            //     {(rowData.slot.calendars[rowData.resource.id].eventId ? "[TAKEN] " : "") + rowData.resource.summary}
            //   </Text>
            // </TouchableHighlight>
            // rowData.slot.calendars[rowData.resource.id].state
            
            // var calendarState = rowData.slot.calendars[rowData.resource.id].state || 0;
            var calendarState = rowData.reservation;
            return (
              <Button 
                state={ calendarState }
                onPress={_.bind(this._onPressButton, this, rowData)}
                style={[styles.row, {
//                 color: rowData.resource.foregroundColor,
                backgroundColor : rowData.resource.backgroundColor,
              }]}>
                { rowData.resource.summary }
              </Button>
            )            
          }}/>          
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
    padding: 15,
    marginTop: 8,
    marginBottom: 1,
    color: 'white',
    backgroundColor : 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row : {
    // padding: 15,
    // marginTop: 1,
    // marginBottom: 1,
    // margin: 5,
    // borderRadius: 10,
    // height: 20,
    height:50,
    borderRadius: 5,
    margin: 5,
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