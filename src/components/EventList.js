'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import EventSection from './EventSection'
import EventRow from './EventRow'
import Loading from './Loading'

import React, { StyleSheet, View, ListView } from 'react-native';


export default React.createClass({
  
  getInitialState() {
    logJSON('EventList.getInitialState')
    // http://moduscreate.com/react-native-listview-with-section-headers/
    const ds = new ListView.DataSource({
      getSectionHeaderData : (dataBlob, sid) => { 
        const headerData = dataBlob.slotById[sid];
        return headerData; 
      },
      getRowData : (dataBlob, sid, eid) => { 
        // logJSON('getRowData' );
        const event = dataBlob.eventById[eid];
        const slot = dataBlob.slotById[event.slotId];
        const resource = dataBlob.resourceById[event.resourceId];
        const rowData = { 
          ...event, 
          resource, 
          slot
        };
        return rowData; 
      },
      sectionHeaderHasChanged : (s1, s2) => { 
        const hasChanged = s1.id !== s2.id;
        if (hasChanged) {
          logJSON(hasChanged, 'sectionHeaderHasChanged');
        }
        return s1.id !== s2.id;
      },
      rowHasChanged : (r1, r2) => { 
        const hasChanged 
          =  r1.id !== r2.id
          || r1.slotId !== r2.slotId
          || r1.resourceId !== r2.resourceId
          || r1.taken !== r2.taken
          || r1.ready !== r2.ready;
        if (hasChanged) {
          logJSON(hasChanged, 'rowHasChanged');
        }
        return hasChanged;
      },      
    });
    return {
      dataSource: ds.cloneWithRows([])
    };
  },
    
  componentDidMount() {
    logJSON('EventList.componentDidMount');
    this.componentWillReceiveProps(this.props);
  },

  componentWillReceiveProps(props) {
    logJSON('EventList.componentWillReceiveProps');

    const dataBlob = props.calendar;
    const rows = dataBlob.slotEventIds;
    const sections = dataBlob.slotIds
    const dataSource = this.state.dataSource.cloneWithRowsAndSections(
        dataBlob, 
        sections, 
        rows)
    this.setState({ 
      dataSource
    });
  },
 
  render() {
    logJSON('EventList.render');
    let self = this;
    // logJSON(_.keys(this.props.calendar), '\n\n\n\n_.keys(this.props.calendar)');
    const ready = this.props.calendar.ready;
    // if (!ready) {
    //   return (
    //     <View style={{'flex':1}}>
    //       <Loading/>
    //     </View>
    //   );
    // }
    
    // Take/Free event.
    const noop = () => console.log('noop');
    const onPress = (ready, taken) => !ready ? noop : taken ? this.props.onFreeEvent : this.props.onTakeEvent;

    return (
      <ListView
        ref="listView"
        // initialListSize={20}
        dataSource={this.state.dataSource}
        // automaticallyAdjustContentInsets={false}
        // keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
        // style={{backgroundColor:'white'}}
        renderSectionHeader = {(sectionData, sectionID) =>
          <EventSection 
            style={styles.section}
            slot={sectionData}
          />
        }
        renderRow = {(rowData, sectionID, rowID, highlightRow) => 
          <EventRow 
            style={[styles.row]}
            event={rowData}
            onPress={onPress(rowData.ready, rowData.taken)}
          />
        }
        renderSeparator = {(rowData, sectionID, rowID, highlightRow) =>
          <View 
            style={[{height:1,backgroundColor:'ghostwhite'}]}
            key={sectionID+rowID}
          />
        }
      />
    )
  },
    
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  section : {
    padding: 10,
  },
  row : {
    padding: 15,
    // borderBottomWidth: 1,
    // borderColor: 'white',
  },  
});
