'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;


var Button = React.createClass({
  getDefaultProps: function() {
    return {
      loading: false
    };
  },
  
  componentDidMount() {
    this.state = {
      bounceValue: new Animated.Value(1.0),
      loading: this.pro,
    };    
  }
  
  _onPress() {
    console.log('_onPress %s', this.state.loading);
    this.setState({
      loading:true
    });
  }
  
  _onHighlight() {
    console.log('_onHighlight %s', this.state.loading);
    if (this.state.loading) return;
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.95,                         // Animate to smaller size
        friction: 7,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
  
  _onUnhighlight() {
    console.log('_onUnhighlight %s', this.state.loading);
    if (this.state.loading) return;    
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1.0,                         // Animate to smaller size
        friction: 7,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }  

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressOut={_.bind(this._onUnhighlight, this)}
        onPressIn={_.bind(this._onHighlight, this)}
        delayPressOut={1}
        style={[
          {
            flex:1,
          }, 
          this.props.style
      ]}>
        <View 
          style={{
            flex:1,
        }}>
          <Animated.View 
            style={{
              flex:1,
              backgroundColor: 'violet',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [ 
                {scale: this.state.bounceValue}, 
              ]      
          }}>
            <Text style={{
              backgroundColor: 'grey',
              color: 'white',
            }}>
              Hola mundo
            </Text>
          </Animated.View>
          

          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent',
            opacity: this.state.loading ? 1 : 0,
          }}>
            <ActivityIndicatorIOS 
              color='black'
              style={{
                backgroundColor: 'transparent',
                marginRight: 20,
            }}/>
          </View>
          
          
        </View>
      </TouchableWithoutFeedback>      
    );  
  }
});

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

module.exports = Button;