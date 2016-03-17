'use strict';

import React, { AppRegistry } from 'react-native';
import { Provider } from 'react-redux/native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// main component
import App from './containers/App';

// reducers
import calendar from './reducers/calendar/reducer';
import auth from './reducers/auth/reducer';

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const reducer = combineReducers({
  calendar,
  auth,
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

  AppRegistry.registerComponent('roomfinder', () => Root);
}
