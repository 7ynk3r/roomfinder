'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { 
  View, 
  Text, 
  TouchableWithoutFeedback, 
  ActivityIndicatorIOS,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

export default class extends React.Component {

  static get states() {
    return {
      initial:0,
      intermediate:1,
      final:2,
    };
  }
  
  constructor(props: any) {
    super(props);
    // this.componentWillReceiveProps(props);
    // console.log('constructor %s', this._isIntermediateState());
    // this.componentWillReceiveProps(props);
    // this.state = { w: 0, h: 0 };
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
    LayoutAnimation.spring();
    logJSON('EventRow.componentWillReceiveProps');
  }

  render() {
    const style = this.props.style;
    const event = this.props.event;
    const title = event.resource.summary;
    const state = !event.ready ? '...' : event.taken ? 'TAKEN' : 'FREE';
    
    // styles
    const width = state.length * 11;
    const borderColor = event.resource.backgroundColor;
    const textAlign = 'center'; 
    const flexDirection = 'row';
    const eventColor = '#EEEEEE';
    const actionColor = event.taken ? '#00ADB5' : '#EEEEEE';
    // const actionColor = event.taken ? '#00ADB5' : '#EB586F';
    
    
    // events
    const onPress = () => {
      this.props.onPress(event.id);
    }
    

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[style, { borderColor, flexDirection }]}>
          <Text style={{'flex':1, color:eventColor}}>
            {title}
          </Text>
          <View 
            style={{
              borderWidth:1, 
              borderRadius:3, 
              borderColor:actionColor, 
              padding:3, 
              paddingLeft:6, 
              paddingRight:6, 
          }}>
            <Text 
              style={{
                textAlign,
                color:actionColor, 
                fontSize:11,
              }}>
              {state}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

};

