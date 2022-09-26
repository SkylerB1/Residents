import {Platform, Alert} from 'react-native';
import React, {createContext, useState, useMemo, useEffect} from 'react';
import {Contractor_Role, API_URL} from '@env';
import {postRequest} from '../API_Requests/Api_Request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermission} from '../Push_Notifications/PushNotification'

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = useMemo(() => API_URL + 'login', []);

  const signIn = async input => {
    setLoading(true);
    const deviceToken = await requestUserPermission();

    // console.log(deviceToken)

    const data = {
      email: input.username,
      password: input.password,
      role: Contractor_Role,
      deviceToken: deviceToken,
      deviceType: Platform.OS,
    };

    const response = await postRequest(url, data);

    if (response.status == 200) {
      setUserData(response.data);
      setToken(response.token);
      await AsyncStorage.setItem('userToken', response.token);
      setLoading(false);
    } else if (response.status == 400) {
      Alert.alert(
        'Wrong Password',
        'If you forgot your password, please contact the owner.',
      );
      setLoading(false);
    } else if (response.status == 500) {
      Alert.alert(
        'Server Error',
        'There is some problem with the server. Please login after sometime.',
      );
      setLoading(false);
    } else {
      console.log(response);
      setLoading(false);
      Alert.alert(
        'Error',
        'There is some error occurred while logging you in. Please try after sometime.',
      );
    }
  };
  const signOut = async () => {
    setUserData(null);
    setToken(null);
    await AsyncStorage.clear();
  };

  const isLoggedIn = async () => {
    setLoading(true);
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
      setLoading(false);
    } catch (e) {
      // console.log(e)
      setLoading(false);
      setToken(null);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <AuthContext.Provider value={{userData, loading, signIn, signOut, token}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
