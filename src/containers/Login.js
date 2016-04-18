// @flow
'use strict';

// Base
import logJSON from '../logJSON'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react-native';
// Components
import LoginView from '../components/Login'
import secret from '../config/secret'
// Actions
import * as authActions from '../actions/auth';

const actions = authActions;

function mapStateToProps(state) {
  return { ...state };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

class Login extends React.Component {
  render () {
    console.log('Login.render');
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
