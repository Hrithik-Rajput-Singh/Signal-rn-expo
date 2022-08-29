import 'react-native-gesture-handler'; //while installing navigation
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './Navigation/MainNavigator';
import {Provider} from 'react-redux';
import store ,{rrfProps} from './firebase';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';







// const rootReducer = combineReducers({
//   auth: authenticReducer,
//   firebase: firebaseReducer
// }) 
// const store = createStore(rootReducer, applyMiddleware(Reduxthunk.withExtraArgument({getFirebase,getFirestore})));

// const store = createStore(rootReducer,compose(
//     applyMiddleware(Reduxthunk.withExtraArgument({getFirebase,getFirestore})),
//     reduxFirestore(firebaseConfig),
//     reactReduxFirebase(firebaseConfig)
//   ) 
// );




export default function App() {
  return (
  <Provider store = {store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <MainNavigator />
    </ReactReduxFirebaseProvider>
   </Provider>
  )
};

//<ReactReduxFirebaseProvider {...rrfProps}>      these is for to connect to firestore when we use these in devtools firestore appear

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
