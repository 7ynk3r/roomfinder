'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { Text } from 'react-native';

export default React.createClass({
  getInitialState() {
    logJSON('EventSection.getInitialState');
    return {};
  },
  
  componentDidMount() {
    logJSON('EventSection.componentDidMount');
  },

  componentWillReceiveProps(props) {
    logJSON('EventSection.componentWillReceiveProps');
  },

  render() {
    const style = this.props.style;
    const slot = this.props.slot;
    logJSON(slot.start, 'slot.start');
    return (
      <Text style={style}>
        {slot.start.toLocaleTimeString() + ' - ' + slot.end.toLocaleTimeString()}
      </Text>    
    );
  }

});
