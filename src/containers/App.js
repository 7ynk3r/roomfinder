'use strict';

import logJSON from '../logJSON'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import { Map } from 'immutable';
import React, {
  LayoutAnimation,  
} from 'react-native';

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

class App extends React.Component {

  componentWillReceiveProps(props) {
  }

  componentDidMount() {
  }
  
  render () {
    // LayoutAnimation.linear();

    // const auth = this.props.auth;
    // const component = !auth.authenticated 
    //   ? <Login />
    //   : <Calendar />

    const component = <Calendar />


    return (
      component
    );
  }
  
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

