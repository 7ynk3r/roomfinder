'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { 
  View, 
  Text, 
  TouchableWithoutFeedback, 
  ActivityIndicatorIOS,
  StyleSheet
} from 'react-native';

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
    // styles
    const backgroundColor = event.resource.backgroundColor;
    const textAlign = 'left'; //!event.ready ? 'center' : event.taken ? 'right' : 'left';
    const flexDirection = 'row';
    const state = !event.ready ? '[...]' : event.taken ? '[taken]' : '[free]';
    // events
    const onPress = () => {
      this.props.onPress(event.id);
    }

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, { backgroundColor, flexDirection }]}>
          <Text style={{'flex':1}}>
            {title}
          </Text>
          <Text>
            {state}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

};

