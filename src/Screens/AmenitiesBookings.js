import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View,Text } from 'react-native'
import React, { useEffect, useState,useMemo } from 'react'
import Header from '../Header/header'
import { widthToDp } from '../Responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import { postRequest } from '../API_Requests/Api_Request';
import Tile from '../Tile/Tile';
import Loader from '../Loader/Loader';

const AmenitiesBookings = () => {
  const [data, setData] = useState([])
  const url = useMemo(() => API_URL + 'get-all-personal-cases', []);
  const [loading,setLoading] = useState(false)
  
  const getData = async () => {
    setLoading(true)
    let user_data = JSON.parse(await AsyncStorage.getItem('user_data'));

    let userId = {
      userId:user_data.id
    }

    const response = await postRequest(url, userId)

    if (response.status == 200) {
      setLoading(false)
      setData(response.data)
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
  //   console.log(data)
  // },[data])
  
  return (
    <SafeAreaView style={styles.root}>
      <Header text="Amenity Bookings" />
      <View style={styles.listView}>
        {loading && <Loader />}
        {data.length == 0 ? <Text style={styles.text}>No bookings to show!</Text> :
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderBookings}
            keyExtractor={item => item.case_number}
          />
        }
      </View>
    </SafeAreaView>
  );
}

export default AmenitiesBookings

const styles = StyleSheet.create({
  root: {flex: 1},
  listView: {flex: 1, padding: widthToDp(3)},
  
  text: {fontSize: widthToDp(4), textAlign: 'center'},
});