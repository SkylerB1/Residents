import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../Screens/Signin';
import Home from '../Screens/Home';
import MaintenanceRequest from '../Screens/MaintenanceRequest';
import AmenitiesBookings from '../Screens/AmenitiesBookings';
import MaintenanceForm from '../Screens/MaintenanceForm';
import InformationBoard from '../Screens/InformationBoard';
import AmenityBookingDetail from '../Screens/AmenityBookingDetail';
import {AuthContext} from '../components/AuthContext/AuthProvider';
import Loader from '../components/Loader/Loader';

const Stack = createNativeStackNavigator();

const index = () => {
  const {token, loading} = useContext(AuthContext);

  if (loading) {
    return <Loader />;
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
