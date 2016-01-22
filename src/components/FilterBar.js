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
        backgroundColor:'gray',
        // borderBottomColor: 'white',
        // borderBottomWidth: 1,
      }}>
        <SegmentedControlIOS 
          tintColor='white'
          style={{margin:5, marginTop:20, marginBottom:0}}
          values={['30\'','60\'']}/>
      </View>
    );
  }

};

