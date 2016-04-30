'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import theme from './theme'

import React, { 
  StyleSheet, 
  View, 
  Text,
} from 'react-native';

export default class extends React.Component {
  
  componentDidMount() {
    logJSON('EventSection.componentDidMount');
  }

  componentWillReceiveProps(props) {
    logJSON('EventSection.componentWillReceiveProps');
  }

  render() {
    const style = this.props.style;
    const slot = this.props.slot;
    return (
      <View style={style}>
        <Text style={styles.sectionText}>
          {slot.start.toString('h:mmTT') + ' - ' + slot.end.toString('h:mmTT')}
        </Text>    
      </View>
    );
  }
  
};

var styles = StyleSheet.create({
  sectionText : {
    color: theme.primaryForegroundColor,
    textAlign: 'left',
  }
});
