// @flow
'use strict';

import React, {View} from 'react-native';
import FreeBusyView from './components/FreeBusyView'

class App extends React.Component {
  render() {
    return (
      <FreeBusyView style={{flex:1, backgroundColor:'green'}} />
    );
  }
}

export default App;
