// @flow
'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from './promise';
import reducers from '../reducers';
import createLogger from 'redux-logger';
// TODO: var analytics = require('./analytics');
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  // Uncomment the following to persist the state.
  // const store = autoRehydrate()(createRFStore)(reducers);
  // persistStore(store, {storage: AsyncStorage}, onComplete);
  // console.log('reducers ' + typeof(reducers));
  //
  // const store = createStoreMiddleware(reducers, {});
  // debugger;

  // // clear the store before starting.
  // AsyncStorage.clear((error)=>{
  //   persistStore(store, {storage: AsyncStorage}, onComplete);
  // })
  // const store = autoRehydrate()(createStoreWithMiddleware)(reducers);

  const store = createStoreWithMiddleware(reducers, {});

  if (isDebuggingInChrome) {
    window.store = store;
  }
  if (onComplete != null) {
    onComplete();
  }
  return store;
}

export default configureStore;
