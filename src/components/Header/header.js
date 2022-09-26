import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import Back from '../../../assets/images/Back.svg'
import { widthToDp } from '../Responsive';
import {useNavigation} from '@react-navigation/native';

const Header = ({ text }) => {
    const navigation = useNavigation()
  return (
    <View
      style={styles.headerView}>
      <Pressable onPress={()=>navigation.goBack()} style={{marginLeft:-widthToDp(10)}}>
        <Back />
      </Pressable>
      <Text style={styles.txt}>{text}</Text>
      <View></View>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    backgroundColor: '#3238a8',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: widthToDp(15),
    paddingBottom: widthToDp(5),
  },
  txt: {fontSize: widthToDp(4.5), color: 'white', fontFamily: 'OpenSans',fontWeight:'600'},
});