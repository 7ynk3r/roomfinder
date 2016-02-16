'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import theme from './theme'

import React, { 
  View, 
  Text, 
  TouchableWithoutFeedback, 
  ActivityIndicatorIOS,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';

class EventRow extends React.Component {

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
      GET:theme.getColor,
      TAKE:theme.takeColor,
      DROP:theme.dropColor,
      RELEASE:theme.releaseColor,
      PROCESSING:theme.processingColor,
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
    const state = { status:status };
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
    const status = this.state.status;
    const statusText = this.statusText[status];
    
    // styles
    const style = this.props.style;
    const borderColor = event.resource.backgroundColor;
    const eventColor = theme.primaryForegroundColor;
    const actionColor = this.statusColor[status];
      
    // events
    const onPress = () => {
      const nextStatus = this.statusNext[status];
      logJSON(nextStatus, 'nextStatusnextStatus');
      if (nextStatus) {
        this.changeStatus(nextStatus, true);
        this.setTimeout(
          () => { 
            if (this.state.status !== nextStatus) return;
            this.changeStatus(status, true); 
          }, 3000);        
      }
      else {
        this.props.onPress(event.id);
      }
    }
    

    return (
      <View style={[style, styles.row, { borderColor }]}>
        <Text style={[styles.rowText, { color:eventColor }]}>
          {title}
        </Text>
        <TouchableWithoutFeedback onPress={onPress}>
          <View 
            style={[styles.button, { borderColor:actionColor }]}>
            <Text 
              style={[styles.buttonText, { color:actionColor }]}>
              { statusText }
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

};

reactMixin(EventRow.prototype, TimerMixin);

var styles = StyleSheet.create({
  row : {
    flexDirection:'row',
  },
  rowText : {
    flex:1,
  },
  button : {
    borderWidth:1, 
    borderRadius:3, 
    padding:3, 
    paddingLeft:6, 
    paddingRight:6,     
  },
  buttonText : {
    textAlign:'center',
    fontSize:11,    
  },
});


export default EventRow;