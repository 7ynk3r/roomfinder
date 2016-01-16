'use strict';

import logJSON from '../logJSON'
import _ from 'underscore'

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

export default React.createClass({
  
  // getInitialState() {
  //   return {};
  // },
  
  componentDidMount() {
    logJSON('EventList.componentDidMount');
    // logJSON(_.keys(this.props), '\n\n\n\n\nEventList.props');
  },

  componentWillReceiveProps(props) {
    logJSON('EventList.componentWillReceiveProps');
  },
 
  render() {
    logJSON('EventList.render');
    let description = JSON.stringify(_.keys(this.props));
    // logJSON(this.props.calendar);
    return (
      <View>
        <Text style={styles.section}>
          {description}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  section : {
    padding: 15,
    marginTop: 8,
    marginBottom: 1,
    color: 'white',
    backgroundColor : 'gray',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  row : {
    height:50,
    borderRadius: 5,
    margin: 5,
  },
});




