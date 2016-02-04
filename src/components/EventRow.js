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
    const state = !event.ready ? '...' : event.taken ? 'TAKEN' : 'FREE';
    // styles
    const borderColor = event.resource.backgroundColor;
    const textAlign = 'left'; 
    const flexDirection = 'row';
    const eventColor = '#EEEEEE';
    const actionColor = event.taken ? '#00ADB5' : '#EEEEEE';
    // const actionColor = event.taken ? '#00ADB5' : '#EB586F';
    
    
    // events
    const onPress = () => {
      this.props.onPress(event.id);
    }
    
    // const image = !event.ready ? <View/> :
    //   <Image
    //     style={{
    //       width: 30,
    //       height: 30,
    //       backgroundColor: 'white',
    //       borderRadius: 15,
    //       borderWidth: 1,
    //       borderColor: color,
    //     }}          
    //     source={{uri}}
    //   />;


    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, { borderColor, flexDirection }]}>
          <Text style={{'flex':1, color:eventColor}}>
            {title}
          </Text>
          <Text style={{color:actionColor, borderWidth:1, borderRadius:3, borderColor:actionColor, paddingLeft:9, paddingTop:3, paddingRight:6, fontSize:11}}>
            {state}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

};

