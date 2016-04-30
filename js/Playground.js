// // @flow
// 'use strict';
//
// import React, { TouchableHighlight, View, Navigator } from 'react-native'
//
// class Navigation extends React.Component{
//   render() {
//     return (
//       <Navigator
//         initialRoute={{id: 'first'}}
//         renderScene={this.navigatorRenderScene.bind(this)}
//         configureScene={this.navigatorConfigureScene.bind(this)}
//       />
//     );
//   }
//
//   navigatorConfigureScene(route, routeStack) {
//     return Navigator.SceneConfigs.FloatFromBottom;
//   }
//
//   navigatorRenderScene(route, navigator) {
//     switch (route.id) {
//       case 'first':
//         return (
//           <TouchableHighlight
//             onPress={this.navigate.bind(this,navigator)}
//             style={{ flex:1 }}
//           >
//             <View
//               style={{
//                 flex:1,
//                 backgroundColor:'green',
//               }}
//               navigator={navigator}
//               title="first"
//             />
//           </TouchableHighlight>
//         );
//       case 'second':
//         return (
//           <TouchableHighlight
//             onPress={this.navigate.bind(this,navigator)}
//             style={{ flex:1 }}
//           >
//             <View
//               style={{
//                 flex:1,
//                 margin:50,
//                 backgroundColor:'red',
//               }}
//               navigator={navigator}
//               title="second"
//             />
//           </TouchableHighlight>
//         );
//     }
//   }
//
//   navigate(navigator) {
//     navigator.push({id: 'second'})
//   }
// }
//
// export default () => Navigation;
