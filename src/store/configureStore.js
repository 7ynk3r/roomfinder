// @flow
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from './promise';
import reducers from '../reducers';
import createLogger from 'redux-logger';
// TODO: var analytics = require('./analytics');
// import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createStoreMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  // const store = autoRehydrate()(createRFStore)(reducers);
  // persistStore(store, {storage: AsyncStorage}, onComplete);
  const store = createStoreMiddleware(reducers, {}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

export default configureStore;
