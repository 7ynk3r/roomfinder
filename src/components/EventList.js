
'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import theme from './theme'

import EventSection from './EventSection'
import EventRow from './EventRow'
import Loading from './Loading'

import React, { 
  StyleSheet, 
  View, 
  Text, 
  ListView, 
} from 'react-native';

export default class extends React.Component {
  
  constructor(props: any) {
    logJSON('EventList.getInitialState')
    super(props);

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
          || r1.ready !== r2.ready
          || r1.errors !== r2.errors;
        if (hasChanged) {
          logJSON(hasChanged, 'rowHasChanged');
        }
        return hasChanged;
      },      
    });
    
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }
    
  componentDidMount() {
    logJSON('EventList.componentDidMount');
    // Initial load.
    this.props.onGetEvents();
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props) {
    logJSON('EventList.componentWillReceiveProps');
    
    // If the slot size changed we re-load.
    if (this.props.calendar.slotSize !== props.calendar.slotSize) {
      this.props.onGetEvents();
    }

    const calendar = props.calendar;
    const rows = calendar.slotEventIds;
    const sections = calendar.slotIds
    const dataSource = this.state.dataSource.cloneWithRowsAndSections(
        calendar, 
        sections, 
        rows);
    
    const ready = calendar.ready;
    const hasResources = _.keys(calendar.resourceById).length>0;
    const hasEvents = _.keys(calendar.eventById).length>0;

    const addCalendarsMessage = 'Go to Google Calendar to add one or more room calendars.';
    const message 
    = !hasResources ? 'There\'re no rooms associated to your Google Calendar account.\n\n'+addCalendarsMessage
    : !hasEvents ? 'There\'re no empty rooms.\n\n'+addCalendarsMessage
    : ''
    
    this.setState({ 
      dataSource,
      hasResources,
      hasEvents,
      ready,
      message,
    });
  }
 
  render() {
    logJSON('EventList.render');
    const state = this.state;
    
    if (!state.ready) {
      return (<Loading style={styles.loading}/>);
    }
    
    const message = state.message;
    if (message.length>0) {
      return (
        <View style={styles.message}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      );
    }
    
    
    // Take/Free event.
    const noop = () => console.log('noop');
    const onPress = (event) => 
      event.errors.length>0 ? this.props.onClearEventErrors :
      !event.ready ? noop : 
      event.taken ? this.props.onFreeEvent : this.props.onTakeEvent;

    return (
      <ListView
        ref="listView"
        // initialListSize={20}
        dataSource={state.dataSource}
        // automaticallyAdjustContentInsets={false}
        // keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
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
            onPress={onPress(rowData)}
          />
        }
        renderSeparator = {(rowData, sectionID, rowID, highlightRow) =>
          <View 
            style={styles.separator}
            key={sectionID+rowID}
          />
        }
      />
    )
  }
    
};

var styles = StyleSheet.create({
  section : {
    paddingTop: theme.largeSize-theme.smallSize,
    paddingBottom: theme.smallSize,
    paddingLeft: theme.largeSize,
    paddingRight: theme.largeSize,
  },
  row : {
    marginLeft: theme.largeSize,
    marginRight: 0,
    padding: theme.normalSize,
    paddingLeft: theme.largeSize-theme.smallSize,
    paddingRight: theme.largeSize,
    backgroundColor: theme.secondaryBackgroundColor,
    borderLeftWidth:theme.smallSize,
  },  
  separator : {
    marginLeft:theme.largeSize, 
    height:theme.borderSize,
    backgroundColor: 'transparent'
  },
  loading : {
    flex:1    
  },
  message : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText : {
    textAlign:'center',
    fontSize:theme.largeFontSize,    
    color:theme.primaryForegroundColor,
  },
});
