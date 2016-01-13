'use strict';

import logJSON from '../logJSON'

import React from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';

import EventList from '../components/EventList'

const actions = [
];

function mapStateToProps(state) {
  return {      
      ...state
  };
};

function mapDispatchToProps(dispatch) {

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
  },

  componentDidMount() {
  },
  
  render () {
    let component = <EventList calendar={this.props.calendar} />;
    return (
      component
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

