'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { 
  View, 
  SegmentedControlIOS,
} from 'react-native';

export default class extends React.Component {
  
  componentDidMount() {
    logJSON('EventRow.componentDidMount');
  }

  componentWillReceiveProps(props) {
    logJSON('EventRow.componentWillReceiveProps');
  }

  render() {
    return (
      <View style={{
        borderBottomColor:'darkgray',
        borderBottomWidth: 1,
      }}>
        <SegmentedControlIOS 
          tintColor='white'
          style={{
            margin:10, 
            marginTop:25, 
          }}
          values={['30\'','60\'']}/>
      </View>
    );
  }

};

