
/**
TODO
- Relojito, button actions names and transitions, crashlytics + google analytics.
- error handling.
- use es6 classes everywhere.
- add more testing.
*/

// @flow
'use strict';

import React, { AppRegistry } from 'react-native';
import createApp from './js/setup';
// import createApp from './js/Playground';

AppRegistry.registerComponent('roomfinder', createApp);
