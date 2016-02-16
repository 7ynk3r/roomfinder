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

let Calendar = React.createClass({

  // getInitialState() {
  //   return {};
  // },

  componentWillReceiveProps(props) {
    logJSON('Calendar.componentWillReceiveProps');
    
  },
  
  componentWillMount() {
    logJSON('Calendar.componentWillMount');
    StatusBarIOS.setStyle('light-content');
  },

  componentDidMount() {
    logJSON('Calendar.componentDidMount');
    // this.actions.getEventsMock();
    // logJSON(_.keys(this.props.actions), '\n\n\n\nthis.actions ');
    // this.props.actions._getEventsMock();
  },
  
  render () {
    logJSON('Calendar.render');
    const calendar = this.props.calendar;
    const actions = this.props.actions;
    const ready = calendar.ready

    return (
      <View style={{flex:1,backgroundColor : theme.primaryBackgroundColor}}>
        <FilterBar 
          slotSizes={calendar.slotSizes}
          slotSize={calendar.slotSize}
          onChangeEventSize={actions.changeSlotSize}
        />
        <EventList 
          style={{flex:1}}
          calendar={calendar}
          onGetEvents={actions._getEventsMock}
          onTakeEvent={actions._takeEventMock}
          onFreeEvent={actions._freeEventMock}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

