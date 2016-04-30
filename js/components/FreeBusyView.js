// @flow
'use strict';

import React, { View, ScrollView, Text } from 'react-native';
import { freeBusy } from '../__mocks__/googleapi.new'

export default class FreeBusyView extends React.Component {
  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={false}
        vertical={true}
        style={{flex:1, backgroundColor:'white', paddingLeft:15, paddingRight:15}}
      >
        <View style={{flex:1, height:50, flexDirection:'row'}}/>

        <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
          <Text style={{width:50, textAlign:'left'}}>
            {'12 AM'}
          </Text>
          <View style={{flex:1, backgroundColor:'darkgray', height:1, marginLeft:15}}/>
        </View>

        <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
          <View style={{flex:1, backgroundColor:'lightgray', height:1, marginLeft:65}}/>
        </View>

        <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
          <Text style={{width:50, textAlign:'left'}}>
            {'1 AM'}
          </Text>
          <View style={{flex:1, backgroundColor:'darkgray', height:1, marginLeft:15}}/>
        </View>

        <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
          <View style={{flex:1, backgroundColor:'lightgray', height:1, marginLeft:65}}/>
        </View>

        <View style={{flex:1, height:20, flexDirection:'row', alignItems:'center'}}>
          <Text style={{width:50, textAlign:'left'}}>
            {'2 AM'}
          </Text>
          <View style={{flex:1, backgroundColor:'darkgray', height:1, marginLeft:15}}/>
        </View>

      </ScrollView>
    );
  }
}
