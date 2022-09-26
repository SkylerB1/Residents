import {Text, StyleSheet, View, KeyboardAvoidingView, ImageBackground, Alert,Platform} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';
import {  heightToDp, widthToDp } from '../Responsive';
import { useNavigation } from '@react-navigation/native';
import { postRequest } from '../API_Requests/Api_Request';
import {API_URL, Resident_Role} from '@env';
import {useForm} from 'react-hook-form'
import { useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission } from '../Push_Notifications/PushNotification';
import { AuthContext } from '../AuthContext/AuthProvider';

const SignIn = () => {
    const { control, handleSubmit } = useForm()
    // const navigation = useNavigation()
    const url = useMemo(()=>API_URL+'login',[])
    const [loading,setLoading] = useState(false)
    // const [deviceToken,setDeviceToken] = useState(null)
    const {signIn} = useContext(AuthContext);
        
    const onLogin =  async (input) => {
      signIn(input)
      
    }
  // const getFcmToken = async () => {
      
  //   let token = await requestUserPermission()
  //   if (token) {
  //     let fcm_token = await AsyncStorage.getItem('fcmToken');
  //     setDeviceToken(fcm_token)
  //   }
    
      
  //   };
  
  // useEffect(() => {
  //    console.log('Token',deviceToken) 
  //   },[deviceToken])
  
    // useEffect(()=>{
    //  getFcmToken()
    // },[])
    return (
      <>
        {/* <ImageBackground style={{aspectRatio:1}} imageStyle={{width:width,height:height}} source={require('../../../assets/images/Building.jpg')}> */}
        <View style={styles.root}>
          <Text style={styles.text}>Sign In</Text>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={widthToDp(20)}>
            <>
              <CustomInput
                placeholder="Email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid Email',
                  },
                }}
                name="username"
                icon="user"
              />
              <CustomInput
                control={control}
                rules={{
                  required: 'Password is required',
                  // minLength: {
                  //   value: 8,
                  //   message: 'Password should be minimum 8 characters',
                  // },
                  // pattern: {
                  //   value:
                  //     /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  //   message:
                  //     'Password should contain  a special character, digit and an uppercase alphabet',
                  // },
                }}
                name="password"
                placeholder="Password"
                icon="lock"
                secureTextEntry
              />

              <CustomButton loading={loading} onPress={handleSubmit(onLogin)} text="Login" />
            </>
          </KeyboardAvoidingView>
        </View>

        {/* </ImageBackground> */}
        {/* <Text style={{ position: 'absolute', bottom: heightToDp(2), alignSelf: 'center', fontSize: widthToDp(7), fontWeight: 'bold', color: 'black' }}>Appwrk</Text> */}
      </>
    );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  text: {
      fontSize: widthToDp(8),
      fontFamily:'OpenSans',
    fontWeight: '700',
    color: '#3238a8',
    marginLeft: widthToDp(10),
    marginVertical: heightToDp(25),
  },
});

export default SignIn;
