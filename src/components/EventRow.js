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

export default class EventRow extends React.Component {

  constructor(props: any) {
    logJSON('EventRow.constructor');
    super(props);
    
    var GET = 'GET';
    var TAKE = 'TAKE';
    var DROP = 'DROP';
    var RELEASE = 'RELEASE';
    var PROCESSING = 'PROCESSING';
    
    this.status = {
      GET,
      TAKE,
      DROP,
      RELEASE,
      PROCESSING,
    }
    
    this.statusColor = {
      GET:'80D6FF',
      TAKE:'95E1D3',
      DROP:'EDF798',
      RELEASE:'F06868',
      PROCESSING:'EEEEEE',
    };

    this.statusText = {
      GET:'GET',
      TAKE:'TAKE',
      DROP:'DROP',
      RELEASE:'RELEASE',
      PROCESSING:'...',
    };

    this.statusNext = {
      GET:TAKE,
      DROP:RELEASE,
    }
        
    this.changeStatus(this.status.GET);
  }
  
  componentDidMount() {
    logJSON('EventRow.componentDidMount');
    this.changeStatus(this.statusFromProps(this.props), false);
  }

  componentWillReceiveProps(props) {
    logJSON('EventRow.componentWillReceiveProps');
    this.changeStatus(this.statusFromProps(props), true);
  }
  
  statusFromProps(props) {
    const event = props.event;
    return !event.ready ? this.status.PROCESSING : event.taken ? this.status.DROP : this.status.GET;
  }
  
  changeStatus(status, animated) {
    const state = { buttonStatus:status };
    if (!this.state) {
      this.state = state;
    }
    else {
      this.setState(state);
    }
    if (animated) {
      LayoutAnimation.spring();
    }
  }
  
  render() {
    logJSON('EventRow.render');

    const event = this.props.event;
    const title = event.resource.summary;
    const status = this.state.buttonStatus;
    const statusText = this.statusText[status];
    
    // styles
    const style = this.props.style;
    const width = status.length * 11;
    const borderColor = event.resource.backgroundColor;
    const textAlign = 'center'; 
    const flexDirection = 'row';
    const eventColor = '#EEEEEE';
    const actionColor = this.statusColor[status];
      
    // events
    const onPress = () => {
      const nextStatus = this.statusNext[status];
      logJSON(nextStatus, 'nextStatusnextStatus');
      if (nextStatus) {
        this.changeStatus(nextStatus, true);
      }
      else {
        this.props.onPress(event.id);
      }
    }
    

    return (
      <View style={[style, { borderColor, flexDirection }]}>
        <Text style={{'flex':1, color:eventColor}}>
          {title}
        </Text>
        <TouchableWithoutFeedback onPress={onPress}>
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
              { statusText }
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

};

