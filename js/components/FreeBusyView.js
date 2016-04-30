// @flow
'use strict';

import React, { View, ScrollView, Text } from 'react-native';
import mock from '../__mocks__/googleapi.new';
import XDate from 'xdate';

export default class FreeBusyView extends React.Component {
  constructor() {
    super();
    const timeMin = new XDate(mock.freeBusy.timeMin);
    const timeMax = new XDate(mock.freeBusy.timeMax);
    var hours = [];
    for(var timeI=timeMin.clone(); timeI.diffMinutes(timeMax) >= 0; timeI.addHours(1)) {
      hours.push({'name':timeI.toString('h TT'), 'isLast':false});
    }
    hours.push({'name':timeI.toString('h TT'), 'isLast':true});
    this.state = {
      hours
    }
  }
  renderBlock(hour) {
    return (
      <View key={hour.name} style={{flex:1}}>
        <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
          <Text style={{width:50, textAlign:'left'}}>
            {hour.name}
          </Text>
          <View style={{flex:1, backgroundColor:'darkgray', height:1, marginLeft:5}}/>
        </View>
        {
          hour.isLast
          ? <View/>
          : <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
              <View style={{flex:1, backgroundColor:'lightgray', height:1, marginLeft:55}}/>
            </View>
        }
      </View>
    );
  }
  render() {
    const renderBlock = this.renderBlock;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        horizontal={false}
        vertical={true}
        style={{flex:1, backgroundColor:'white', paddingLeft:15, paddingRight:15}}
      >
        <View style={{flex:1, height:50, flexDirection:'row'}}/>
        { this.state.hours.map(renderBlock) }
      </ScrollView>
    );
  }
}
