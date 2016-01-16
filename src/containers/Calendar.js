'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';

import EventList from '../components/EventList'
import * as calendarActions from '../reducers/calendar/actions';

const actions = [
  calendarActions
];


const mapStateToProps = state => {  
  return {      
    ...state
  };

  
  const calendar = state.calendar.toJSON();
  const events = _.values(calendar.eventById);
  const eventsBySlotId = _.groupBy(events, 'slotId');
  const slotIds = _.sortBy(_.keys(eventsBySlotId), sid => calendar.slotById[sid].start);
  const slotEventIds = _.map(slotIds, sid => _.pluck(eventsBySlotId[sid], 'id'));
  const x = { 'calendar' : {
    ...calendar, slotIds, slotEventIds
  }};
  // logJSON(x, '\n\n\n\n\n\n<<<<<<')
  return x;
  
  // const x = state.calendar.toJSON();
  // const events = _.values(x.eventById);
  // const eventsBySlotId = _.groupBy(events, 'slotId');
  // const calendar = _.map(x.slotIdx, sid => { 
  //   const s = x.slotById[sid];
  //   const slotEvents = eventsBySlotId[sid];
  //   // TODO: The calendars must be sorted.
  //   s.calendars = _.map(slotEvents, e => x.resourceById[e.resourceId]);
  //   return s;
  // });
  // logJSON(calendar, 'calendar');
  // return { calendar };  
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

  componentDidMount() {
    logJSON('Calendar.componentDidMount');
    // this.actions.getEventsMock();
    // logJSON(_.keys(this.props.actions), '\n\n\n\nthis.actions ');
    this.props.actions._getEventsMock();
  },
  
  render () {
    logJSON('Calendar.render');
    let component = <EventList calendar={this.props.calendar} />;
    return (
      component
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

