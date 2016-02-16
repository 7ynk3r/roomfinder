'use strict';

import logJSON from '../logJSON'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';
import React from 'react-native';

import Calendar from './Calendar';
import Login from './Login';

const actions = [];

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

let App = React.createClass({

  // getInitialState() {
  //   return {};
  // },

  componentWillReceiveProps(props) {
  },

  componentDidMount() {
  },
  
  render () {
    const auth = this.props.auth;
    // TODO: Remove the double negation.
    const component = !!auth.authenticated 
      ? <Login />
      : <Calendar />

    logJSON(auth, '\n\n\nauth')
    return (
      component
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

