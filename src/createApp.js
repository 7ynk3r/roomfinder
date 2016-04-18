// @flow
'use strict';

import React from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';

function createApp(): React.Component {
  class Root extends React.Component {
    state: {
      isLoading: boolean,
      store: Object
    };
    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }
    render() {
      if (this.state.isLoading) {
        return null;
      }
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }
  return (Root: React.Component);
}
export default createApp
