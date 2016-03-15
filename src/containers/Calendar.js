'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { View, StatusBarIOS, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';

import theme from '../components/theme'

import EventList from '../components/EventList'
import Loading from '../components/Loading'
import FilterBar from '../components/FilterBar'

import * as calendarActions from '../reducers/calendar/actions';


const actions = [
  calendarActions
];


const mapStateToProps = state => {  
  
  logJSON(state.auth, "state.auth")
  
  const calendar = state.calendar.toJS();
  const events = _.values(calendar.eventById);
  const eventsBySlotId = _.groupBy(events, 'slotId');
  const slotIds = _.sortBy(_.keys(eventsBySlotId), sid => calendar.slotById[sid].start);
  const slotEventIds = _.map(slotIds, sid => _.pluck(eventsBySlotId[sid], 'id'));
  const slotSizes = calendar.slotSizes;
  const slotSize = calendar.slotSize;
  return { 'calendar' : {
    ...calendar, slotIds, slotEventIds, slotSizes, slotSize
  }};
  
};

const mapDispatchToProps = dispatch => {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class Calendar extends React.Component {

  componentWillReceiveProps(props) {
    logJSON('Calendar.componentWillReceiveProps');
    
  }
  
  componentWillMount() {
    logJSON('Calendar.componentWillMount');
    StatusBarIOS.setStyle('light-content');
  }

  componentDidMount() {
    logJSON('Calendar.componentDidMount');
  }
  
  render () {
    logJSON('Calendar.render');
    const calendar = this.props.calendar;
    const actions = this.props.actions;
    const ready = calendar.ready

    return (
      <View style={styles.container}>
        <FilterBar 
          slotSizes={calendar.slotSizes}
          slotSize={calendar.slotSize}
          onChangeEventSize={actions.changeSlotSize}
        />
        <EventList 
          style={styles.eventList}
          calendar={calendar}
          onGetEvents={actions.getEvents}
          onTakeEvent={actions._takeEventMock}
          onFreeEvent={actions._freeEventMock}
          onClearEventErrors={actions.clearEventErrors}
        />
      </View>
    );
  }
  
};

var styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:theme.primaryBackgroundColor,
  },
  eventList : {
    flex:1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

