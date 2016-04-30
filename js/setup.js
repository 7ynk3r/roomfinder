// @flow
'use strict';

import React from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';

function setup(): any {
  console.disableYellowBox = true;

  type State = {
    isLoading: boolean,
    store: Object,
  };

  class Root extends React.Component {
    state: State;
    constructor() {
      super();
      this.state = {
        // isLoading: false,
        // store: configureStore(() => this.setState({isLoading: false})),
        isLoading: true,
        store: configureStore(),
      };
    }
    render() {
      console.log('createApp.render');
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }
  return Root;
}
export default setup
