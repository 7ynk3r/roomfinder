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
        
    this.state = this.calculateState();
  }
  
  componentDidMount() {
    logJSON('EventRow.componentDidMount');
    this.setState(this.calculateState(this.props));
  }

  componentWillReceiveProps(props) {
    
    this.setState(this.calculateState(props));
    LayoutAnimation.spring();
    logJSON('EventRow.componentWillReceiveProps');
  }
  
  calculateState(props) {
    logJSON('EventRow.calculateState');
    var buttonStatus = this.status.GET;
    if (props) {
      logJSON(event, 'xxxxx');
      const event = props.event;
      buttonStatus = !event.ready ? this.status.PROCESSING : event.taken ? this.status.DROP : this.status.GET;
    }
    
    logJSON(buttonStatus, 'yyyyyyy');
    return {
      buttonStatus,
    };
    
  }
  
  render() {
    logJSON('EventRow.render');

    const style = this.props.style;
    const event = this.props.event;
    const title = event.resource.summary;
    const status = this.state.buttonStatus;
    const statusText = this.statusText[status];
    
    // styles
    const width = status.length * 11;
    const borderColor = event.resource.backgroundColor;
    const textAlign = 'center'; 
    const flexDirection = 'row';
    const eventColor = '#EEEEEE';
    // const actionColor = status === "GET" ? 'blue' : status === "..." ? 'yellow' : 'green';
    const actionColor = this.statusColor[status];
    logJSON(status, 'actionColoractionColor')
    logJSON(actionColor, 'actionColoractionColor')
      
    // events
    const onPress = () => {
      if (status == this.status.GET) {
        LayoutAnimation.spring();
        this.setState({buttonStatus:this.status.TAKE});
      }
      else if (status == this.status.DROP) {
        LayoutAnimation.spring();
        this.setState({buttonStatus:this.status.RELEASE});
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

