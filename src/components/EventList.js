'use strict';

import logJSON from '../logJSON'

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
    logJSON(this.props, '\n\n\n\n\nEventList.props');
  },
 
  render() {
    let description = JSON.stringify(this.props);
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




