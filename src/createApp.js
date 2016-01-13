'use strict';

import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux/native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import App from './containers/Calendar';
import calendar from './reducers/calendar/reducer';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const reducer = combineReducers({
  calendar
});

const configureStore = initialState => {
  return createStoreWithMiddleware(reducer, initialState);
};

export default platform => {

  let Root = React.createClass( {
    render() {
      const store = configureStore();

      return (
        <Provider store={store}>
          {() => <App />}
        </Provider>
      );

    }
  });

  AppRegistry.registerComponent('Root', () => Root);
}
