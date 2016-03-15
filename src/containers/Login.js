'use strict';

// Base
import logJSON from '../logJSON'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';
import React, { View, StyleSheet } from 'react-native';

// Components
import LoginView from '../components/Login'
import secret from '../reducers/auth/secret'

// Actions 
import * as authActions from '../reducers/auth/actions';


const actions = [
  authActions
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

class Login extends React.Component {

  componentWillReceiveProps(props) {
  }

  componentDidMount() {
    // this.props.actions._authenticateMock('code');
    // logJSON(this.props.actions.authenticate, "this.props.actions.authenticate");
  }
  
  render () {
    const actions = this.props.actions;    
    // logJSON(actions, "\n\n\nactions");
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

