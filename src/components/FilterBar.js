'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import theme from './theme'

import React, { 
  StyleSheet, 
  View, 
  SegmentedControlIOS 
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

  render() {
    logJSON('FilterBar.render');
    return (
      <View style={styles.segmentedControlContainer}>
        <SegmentedControlIOS 
          tintColor={theme.primaryForegroundColor}
          style={styles.segmentedControl}
          values={this.state.slotSizeTexts}
          selectedIndex={this.state.slotSizeIndex}
          onValueChange={_.bind(this._onValueChange, this)}
        />
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
  }
});
