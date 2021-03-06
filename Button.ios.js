'use strict';

// references
// https://facebook.github.io/react-native/docs/modal.html#content
// https://github.com/facebook/react-native/issues/1234

var _ = require('underscore');

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
  TouchableWithoutFeedback,
  Animated,
} = React;


class Button extends React.Component {

  static get states() {
    return {
      initial:0,
      intermediate:1,
      final:2,
    };
  }
  
  _isInitialState() { return this.props.state === Button.states.initial; }
  _isIntermediateState() { return this.props.state === Button.states.intermediate; }
  _isFinalState() { return this.props.state === Button.states.final; }
  
  constructor(props: any) {
    super(props);
    // this.componentWillReceiveProps(props);
    // console.log('constructor %s', this._isIntermediateState());

    // this.componentWillReceiveProps(props);
        
    this.state = {
      // state: props.state,
      bounceValue: new Animated.Value(1),
      fadeAnim: new Animated.Value(0), 
    };

    // TODO: Property validation
    // https://facebook.github.io/react/docs/reusable-components.html#prop-validation
    // this.propTypes = {
    //   state: React.PropTypes.oneOf(['News', 'Photos']).isRequired,
    // };    
  }
  
  // componentWillReceiveProps(props: any) {
  //   // console.log('componentDidMount ');
  //   var noState = _.isUndefined(this.state);
  //   var hasChanged = noState || this.props.state != props.state;
    
  //   if (noState) {
      
  //     // Initial state
  //     this.state = {
  //       state: props.state,
  //       bounceValue: new Animated.Value(1),
  //       fadeAnim: new Animated.Value(0),       
  //     };
      
  //   }
  //   else {
  //     this.setState({state : props.state});      
  //   }    
  // } 
    
  // shouldComponentUpdate(nextProps, nextState) {
  //   // TODO: This should be defined by the data source.
  //   // console.log("shouldComponentUpdate ", this.props.state != nextProps.state);
  //   return this.props.state != nextProps.state;
  // }
  
  // componentDidMount() {
  //   // console.log('componentDidMount ');
  //   this.state = {
  //     state: this.props.state,
  //     bounceValue: new Animated.Value(1),
  //     fadeAnim: new Animated.Value(0), 
  //   };
  // }  
  
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  _onPress() {
    // if (this._isIntermediateState()) return;
    
    // this.setState({
    //   state: Button.states.intermediate,
    // });
    this.props.onPress();
  }
  
  _onHighlight() {
    // console.log('_onHighlight %s', this._isIntermediateState());
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 0.95,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }
  
  _onUnhighlight() {
    // console.log('_onUnhighlight %s', this._isIntermediateState());
    Animated.spring(                          // Base: spring, decay, timing
      this.state.bounceValue,                 // Animate `bounceValue`
      {
        toValue: 1.0,                         // Animate to smaller size
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // Start the animation
  }  
  
  _startLoadingAnimation() {
    console.log('_startLoadingAnimation %s', this.props.state);

    var animatedInital = 
      Animated.timing(   
        this.state.fadeAnim,
        {
          toValue: 0,
          // duration: 500,
        },
      );
    var animatedFinal = 
      Animated.timing(   
        this.state.fadeAnim,
        {
          toValue: 1,
          // duration: 500,
        },
      );

    var animated 
      = this._isInitialState() ? animatedInital
      : this._isFinalState() ? animatedFinal
      : Animated.sequence([ 
          animatedFinal,
          animatedInital,           
        ]);
            
    animated.start((result) => {
      // TODO: This may leak memory after unmount.
      if (this._isIntermediateState()) {
        this._startLoadingAnimation();
      }
    });    
  }

  render() {
    console.log('render %s', this.props.state);
    
    var buttonContent = 
        <Text style={{
          color: 'black',
        }}>
          {this.props.children}
        </Text>    
    
    this._startLoadingAnimation();
    
    return (
      <TouchableWithoutFeedback
        onPress={_.bind(this._onPress, this)}
        onPressOut={_.bind(this._onUnhighlight, this)}
        onPressIn={_.bind(this._onHighlight, this)}
        delayPressOut={1}
      >
        <Animated.View 
          style={[
            {
              alignItems: 'center',
              justifyContent: 'center',
              transform: [ 
                {scale: this.state.bounceValue}, 
              ],           
            },
            this.props.style,
        ]}>
          {buttonContent}
          
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
            backgroundColor: 'transparent'
          }}>
            <Animated.Image 
              source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
              style={{
                borderRadius: 15,
                width: 30,
                height: 30,
                marginRight: 10,
                opacity: this.state.fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.25, 0.75],
                }),
                transform: [ 
                  {scale: this.state.fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  })}, 
                  // {rotate: this.state.fadeAnim.interpolate({
                  //   inputRange: [0, 1],
                  //   outputRange: ['90deg', '0deg'],
                  // })}, 
                ],           
            }}/>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>      
    );  
  }
}

var styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

module.exports = Button;