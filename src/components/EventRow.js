'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { Text, TouchableWithoutFeedback } from 'react-native';

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
    const self = this;
    const style = this.props.style;
    const event = this.props.event;
    const title = event.resource.summary;
    // logJSON(event, '\n\n\n\nevent');
    const backgroundColor = event.resource.backgroundColor;
    const textAlign = !event.ready ? 'center' : event.taken ? 'right' : 'left';
    const onPress = () => {
      logJSON('onPress');
      logJSON(self.props, 'self');
      logJSON(self.props.onPress, 'self.props.onPress');
      self.props.onPress(event.id);
    }

    return (
      <TouchableWithoutFeedback onPress={onPress.bind(self)}>
        <Text style={[style, { backgroundColor, textAlign }]}>
          {title}
        </Text>
      </TouchableWithoutFeedback>
    );
  }

};
