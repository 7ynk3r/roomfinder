'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { View, StatusBarIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';

import EventList from '../components/EventList'
import Loading from '../components/Loading'
import FilterBar from '../components/FilterBar'

import * as calendarActions from '../reducers/calendar/actions';

const actions = [
  calendarActions
];


const mapStateToProps = state => {  
  
  const calendar = state.calendar.toJS();
  const events = _.values(calendar.eventById);
  const eventsBySlotId = _.groupBy(events, 'slotId');
  const slotIds = _.sortBy(_.keys(eventsBySlotId), sid => calendar.slotById[sid].start);
  const slotEventIds = _.map(slotIds, sid => _.pluck(eventsBySlotId[sid], 'id'));
  logJSON(slotEventIds, 'mapStateToProps'); 
  return { 'calendar' : {
    ...calendar, slotIds, slotEventIds
  }};
  
};

const mapDispatchToProps = dispatch => {
  logJSON(_.keys(actions[0]));
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
    // StatusBarIOS.setStyle('default');
  },

  componentDidMount() {
    logJSON('Calendar.componentDidMount');
    // this.actions.getEventsMock();
    // logJSON(_.keys(this.props.actions), '\n\n\n\nthis.actions ');
    this.props.actions._getEventsMock();
  },
  
  render () {
    logJSON('Calendar.render');
    const calendar = this.props.calendar;
    const actions = this.props.actions;
    const ready = calendar.ready
    const component = !ready 
      ? <Loading style={{flex:1}}/>
      : <View style={{flex:1}}>
          <FilterBar />
          <EventList 
            style={{flex:1}}
            calendar={calendar}
            onTakeEvent={actions._takeEventMock}
            onFreeEvent={actions._freeEventMock}/>
        </View>

    return (
      <View style={{flex:1,backgroundColor : 'white'}}>
        { component }
      </View>
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

