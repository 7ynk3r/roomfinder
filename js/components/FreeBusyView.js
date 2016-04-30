// @flow
'use strict';

import React, { View, ScrollView, Text } from 'react-native';
import mock from '../__mocks__/googleapi.new';
import XDate from 'xdate';

const { freeBusy } = mock;

export default class FreeBusyView extends React.Component {
  constructor() {
    super();

    // hours
    const timeMin = new XDate(freeBusy.timeMin);
    const timeMax = new XDate(freeBusy.timeMax);
    var hours = [];
    for(var timeI=timeMin.clone(); timeI.diffMinutes(timeMax) >= 0; timeI.addHours(1)) {
      hours.push({'name':timeI.toString('h TT'), 'isLast':false});
    }
    hours.push({'name':timeI.toString('h TT'), 'isLast':true});

    // busy
    let busy = freeBusy.calendars["medallia.com_32343532323235353636@resource.calendar.google.com"].busy;
    var previousLenght = 0;
    busy = busy.map(b => {
      const start = new XDate(b.start);
      const end = new XDate(b.end);
      const offset = timeMin.diffMinutes(start)-previousLenght;
      const lenght = start.diffMinutes(end);
      previousLenght+=lenght;
      return { start, end, offset, lenght };
    })

    console.log('busy ' + JSON.stringify(busy));

    this.state = {
      hours,
      busy,
    }
  }
  renderHour(hour) {
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
  renderBusy(busyBlock) {
    const { start, end, offset, lenght } = busyBlock;
    const top = Math.round((offset/60)*40+10);
    const height = Math.round((lenght/60)*40);
    const key=''+offset*lenght;
    debugger;
    return (
      <Text
        key={key}
        style={{
          height,
          top,
          left:0,
          right:0,
          backgroundColor:'gray',
        }}
      >
        { start.toString('M/d/yy h(:mm)TT') + ' - ' + end.toString('M/d/yy h(:mm)TT') }
      </Text>
    );
  }
  render() {
    const that = this;
    // return (
    //   <View style={{flex:1, backgroundColor:'green'}}>
    //     <View style={{position:'absolute', top:0, left:55, right:0, bottom:0, backgroundColor:'gray', opacity:.5}}>
    //       <View style={{
    //         backgroundColor:'yellow',
    //         position:'absolute',
    //         height:40,
    //         top:40,
    //         left:0,
    //         right:0,
    //       }}/>
    //       <View style={{
    //         backgroundColor:'blue',
    //         position:'absolute',
    //         height:40,
    //         top:80,
    //         left:0,
    //         right:0,
    //       }}/>
    //       <View style={{
    //         backgroundColor:'purple',
    //         position:'absolute',
    //         height:40,
    //         top:120,
    //         left:0,
    //         right:0,
    //       }}/>
    //     </View >
    //
    //   </View >
    // );

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'gray',height:64}}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          vertical={true}
          style={{flex:1, backgroundColor:'white', paddingLeft:15, paddingRight:15}}
        >
          { this.state.hours.map(this.renderHour) }
          <View style={{position:'absolute', top:0, left:55, right:0, bottom:0, backgroundColor:'yellow', opacity:.5}}>
            { this.state.busy.map(this.renderBusy, that) }
          </View>
        </ScrollView>
      </View>
    );
  }
}
