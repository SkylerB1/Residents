import React, {useEffect} from 'react';

import {StatusBar} from 'react-native';
import AppNav from './src/Navigation/AppNav';
import {notificationListner} from './src/components/Push_Notifications/PushNotification';
import AuthProvider from './src/components/AuthContext/AuthProvider';
// import { setCustomText } from 'react-native-global-props';

const App = () => {

  
  useEffect(() => {
    notificationListner();
  }, []);
  return (
    <AuthProvider>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <AppNav />
    </AuthProvider>
  );
};

export default App;
