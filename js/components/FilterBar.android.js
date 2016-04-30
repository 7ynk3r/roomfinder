'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import theme from './theme'

import React, { 
  StyleSheet, 
  View, 
  Text, 
  TouchableHighlight
} from 'react-native';

export default class extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      slotSizeValues : props.slotSizes,
      slotSizeTexts : _.map(props.slotSizes, sz => sz + '\''),
      slotSizeValue : props.slotSize,
      slotSizeIndex : _.indexOf(props.slotSizes, props.slotSize)
    };
  }
  
  componentWillReceiveProps(props) {
    logJSON('FilterBar.componentWillReceiveProps');
    this.setState({
      slotSizeValue : props.slotSize,
      slotSizeIndex : _.indexOf(props.slotSizes, props.slotSize)
    });
  }
  
  componentDidMount() {
    logJSON('FilterBar.componentDidMount');
  }
  
  _onValueChange(value) {
    const slotSizeIndex = _.indexOf(this.state.slotSizeTexts, value);
    const slotSizeValue = this.state.slotSizeValues[slotSizeIndex];
    this.props.onChangeEventSize(slotSizeValue);
  }

  // render() {
  //   logJSON('FilterBar.render');
  //   return (
  //     <View style={styles.segmentedControlContainer}>
  //       <SegmentedControlIOS 
  //         tintColor={theme.primaryForegroundColor}
  //         style={styles.segmentedControl}
  //         values={this.state.slotSizeTexts}
  //         selectedIndex={this.state.slotSizeIndex}
  //         onValueChange={_.bind(this._onValueChange, this)}
  //       />
  //     </View>
  //   );
  // }

  render() {
    logJSON('FilterBar.render');
    // logJSON(this.state.slotSizes, 'this.state.slotSizes');
    // const slotSizes = this.state.slotSizeValues;
    // const slotSize = this.state.slotSize;
    // const slotSizeIndex = _.indexOf(slotSizes, slotSize);
    logJSON(this.state.slotSizeValue, 'this.state.slotSizeValue');
    logJSON(this.state.slotSizeIndex, 'this.state.slotSizeIndex');

    var slots = this.state.slotSizeTexts;

    return (
      <View style={[styles.segmentedControlContainer,{
        borderBottomColor:'#393E46',
        borderBottomWidth: 1,
        flexDirection: 'row'
      }]}>

        {slots.map(function(slot) {
          return (
            <TouchableHighlight style={{'flex':1}}>
              <View 
                style={[styles.button, { borderColor: theme.primaryForegroundColor}]}>
                <Text style={[styles.buttonText, {color: theme.primaryForegroundColor}]}>
                  {slot}
                </Text>
              </View>
            </TouchableHighlight>
          );
        })}
          
        
      </View>
    );
  }

};

var styles = StyleSheet.create({
  segmentedControlContainer : {
    borderBottomColor:theme.secondaryBackgroundColor,
    borderBottomWidth:theme.borderSize,    
  },
  segmentedControl : {
    marginTop:theme.normalSize+theme.statusBarSize, 
    marginBottom:theme.normalSize, 
    marginLeft:theme.largeSize, 
    marginRight:theme.largeSize,     
  },
  button : {
    margin:4,
    borderWidth:1, 
    borderRadius:3, 
    padding:3, 
    paddingLeft:6, 
    paddingRight:6,     
  },
  buttonText : {
    textAlign:'center',
  }

  
});

