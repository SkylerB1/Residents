import {  FlatList, SafeAreaView, StyleSheet, View,Text } from 'react-native'
import React, { useEffect, useState,useMemo, useContext } from 'react'
import Header from '../components/Header/header';
import {widthToDp} from '../components/Responsive';
import {API_URL} from '@env';
import {postRequest} from '../components/API_Requests/Api_Request';
import Tile from '../components/Tile/Tile';
import Loader from '../components/Loader/Loader';
import {AuthContext} from '../components/AuthContext/AuthProvider';

const AmenitiesBookings = () => {
  const [data, setData] = useState([])
  const url = useMemo(() => API_URL + 'get-all-personal-cases', []);
  const [loading, setLoading] = useState(false)
  const {userData} = useContext(AuthContext);
  
  const getData = async () => {
    setLoading(true)

    let userId = {
      userId:userData.id
    }

    // console.log({userId:userId})

    const response = await postRequest(url, userId)

    if (response.status == 200) {
      setLoading(false)
      setData(response.data)
      // console.log(response.data)
    }
    else {
      // console.log(response.data)
    }
    
  }

    const renderBookings = ({ item }) => {
        return (
          <Tile
            item={item}
          />
        );
    }
  useEffect(() => {
    getData()
  }, [])
  
  // useEffect(() => {
  //   console.log(userData)
  // },[userData])
  
  return (
    <View style={styles.root}>
      <Header text="Amenity Bookings" />
      <View style={styles.listView}>
        {loading ? <Loader /> :
        data.length == 0 ? <Text style={styles.text}>No bookings to show!</Text> :
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderBookings}
            keyExtractor={item => item.case_number}
          />
        }
      </View>
    </View>
  );
}

export default AmenitiesBookings

const styles = StyleSheet.create({
  root: {flex: 1},
  listView: {flex: 1, padding: widthToDp(3)},
  
  text: {fontSize: widthToDp(4), textAlign: 'center'},
});