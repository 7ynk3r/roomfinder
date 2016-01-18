'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { Text } from 'react-native';

export default class extends React.Component {

  static get states() {
    return {
      initial:0,
      intermediate:1,
      final:2,
    };
  }
  
  _isInitialState() { 
    return this.props.state === Button.states.initial; 
  }
  
  _isIntermediateState() { 
    return this.props.state === Button.states.intermediate; 
  }
  
  _isFinalState() { 
    return this.props.state === Button.states.final; 
  }
  
  componentDidMount() {
    logJSON('EventRow.componentDidMount');
  }

  componentWillReceiveProps(props) {
    logJSON('EventRow.componentWillReceiveProps');
  }

  render() {
    const style = this.props.style;
    const event = this.props.event;
    const title = event.resource.summary;
    const backgroundColor = event.resource.backgroundColor;

    return (
      <Text style={[style, { backgroundColor }]}>
        {title}
      </Text>    
    );
  }

};
