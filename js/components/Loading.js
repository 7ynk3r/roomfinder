import logJSON from '../logJSON'
import _ from 'underscore'

import React, { ActivityIndicatorIOS,  } from 'react-native';


export default class extends React.Component {
  render() {
    return (
      <ActivityIndicatorIOS 
        color='white'
        style={this.props.style}
        size='large'/>
    );
  }
}