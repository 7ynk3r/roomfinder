'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { View, Text } from 'react-native';

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
    return (
      <View style={style}>
        <Text style={{ 
          color: '#EEEEEE',
          // fontWeight: 'bold',
          textAlign: 'left'
        }}>
          {slot.start.toString('h:mmTT') + ' - ' + slot.end.toString('h:mmTT')}
        </Text>    
      </View>
    );
  }

});
