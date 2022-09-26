import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../components/Screens/Signin';
import Home from '../components/Screens/Home';
import MaintenanceRequest from '../components/Screens/MaintenanceRequest';
import AmenitiesBookings from '../components/Screens/AmenitiesBookings';
import MaintenanceForm from '../components/Screens/MaintenanceForm';
import InformationBoard from '../components/Screens/InformationBoard';
import AmenityBookingDetail from '../components/Screens/AmenityBookingDetail';
import {AuthContext} from '../components/AuthContext/AuthProvider';
import Loader from '../components/Loader/Loader';

const Stack = createNativeStackNavigator();

const index = () => {
  const { token, loading } = useContext(AuthContext);
  
  if (loading) {
    return <Loader />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Maintenance" component={MaintenanceRequest} />
            <Stack.Screen name="Amenities" component={AmenitiesBookings} />
            <Stack.Screen
              name="AmenityBookingDetail"
              component={AmenityBookingDetail}
            />
            <Stack.Screen name="MaintenanceForm" component={MaintenanceForm} />
            <Stack.Screen
              name="InformationBoard"
              component={InformationBoard}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{animationTypeForReplace: 'push'}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
