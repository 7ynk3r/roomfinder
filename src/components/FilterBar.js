'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

import React, { 
  View, 
  SegmentedControlIOS,
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
    // logJSON(slotSizeValue, 'xxxxx');
    this.props.onChangeEventSize(slotSizeValue);
  }

  render() {
    logJSON('FilterBar.render');
    // logJSON(this.state.slotSizes, 'this.state.slotSizes');
    // const slotSizes = this.state.slotSizeValues;
    // const slotSize = this.state.slotSize;
    // const slotSizeIndex = _.indexOf(slotSizes, slotSize);
    logJSON(this.state.slotSizeValue, 'this.state.slotSizeValue');
    logJSON(this.state.slotSizeIndex, 'this.state.slotSizeIndex');
    return (
      <View style={{
        borderBottomColor:'#393E46',
        borderBottomWidth: 1,
      }}>
        <SegmentedControlIOS 
          // momentary={true}
          tintColor={'#EEEEEE'}
          style={{
            marginTop:25, 
            marginBottom:10, 
            marginLeft:20, 
            marginRight:20, 
          }}
          values={this.state.slotSizeTexts}
          selectedIndex={this.state.slotSizeIndex}
          onValueChange={_.bind(this._onValueChange, this)}
        />
      </View>
    );
  }

};

