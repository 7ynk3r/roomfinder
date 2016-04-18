// @flow
'use strict';

// Base
import logJSON from '../logJSON'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import React from 'react-native';
// Components
import LoginView from '../components/Login'
import secret from '../reducers/auth/secret'
// Actions
// import * as authActions from '../reducers/auth/actions';
import * as authActions from '../actions/auth';

const actions = [ authActions ];

function mapStateToProps(state) {
  return { ...state };
};

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();
  debugger;
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class Login extends React.Component {
  render () {
    const actions = this.props.actions;
    let component = <LoginView
        client_id={secret.google.client_id}
        onCode={actions.authenticate}
      />;
    return (
      component
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
