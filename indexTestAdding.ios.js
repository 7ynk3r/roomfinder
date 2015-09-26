/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
  WebView,
  ListView,
} = React;
var urlParser = require('./urlParser');
var secret = require('./secret');
var mockData = require('./mockData');

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor='#a9d9d4'>
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var xx = 1;
var roomfinder = React.createClass({
  _genRows: function(nGenRows): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < nGenRows; ii++) {
      dataBlob.push({summary:'summary'+ii});
    }
    return dataBlob;
  },
  
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      modalVisible: false,
      dataSource: ds.cloneWithRows(this._genRows(xx))
    };
  },

  _setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
      dataSource: this.state.dataSource.cloneWithRows(this._genRows(xx++)),
    });
  },
  
  render() {
    
    return (
      <View>
        <Modal
          animated={true}
          transparent={false}
          visible={this.state.modalVisible}>

          <Button onPress={this._setModalVisible.bind(this, false)}>
            Close
          </Button>
            
        </Modal>

        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>
        
        <ListView
          dataSource={this.state.dataSource}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderRow={(rowData) => 
            <Text style={styles.cell}>{rowData.summary}</Text>
          }
        />
        
      </View>
    );
  },
});


var BGWASH = 'rgba(255,255,255,0.8)';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },  
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  list: {
    flex: 1,
    height: 350,
  },
  cell : {
    backgroundColor: 'yellow',    
  },
});


AppRegistry.registerComponent('roomfinder', () => roomfinder);
