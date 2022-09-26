
import React, { useEffect } from 'react';

import {
  Text,
  SafeAreaView,
  StatusBar,
  } from 'react-native';
import Navigation from './src/Navigation'
import { notificationListner } from './src/components/Push_Notifications/PushNotification';
import AuthProvider from './src/components/AuthContext/AuthProvider';
// import { setCustomText } from 'react-native-global-props';

const App = () => {
  
  useEffect(() => {
    notificationListner()
},[])
  return (
    <AuthProvider>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle='dark-content'
      />
      <Navigation/>
    </AuthProvider>
  );
};





export default App;
