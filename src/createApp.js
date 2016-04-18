// @flow
'use strict';

import React from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';

function createApp(): React.Component {
  class Root extends React.Component {
    state: {
      store: Object
    };
    constructor() {
      super();
      this.state = {
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
export default createApp
