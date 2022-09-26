import {StyleSheet, Text, TouchableOpacity, View,Pressable} from 'react-native';
import React, {useState} from 'react';
import {heightToDp, widthToDp} from '../Responsive';
import {useNavigation} from '@react-navigation/native';
import User from '../../../assets/images/User.svg';
const Notice = ({title, status, description, name, time}) => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.MainTxt}>{title}</Text>
        <Text style={styles.nameText}>{time}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.descText}>{description}</Text>
      </View>
      <View style={styles.nameContainer}>
        <User width={widthToDp(3)} height={heightToDp(3)} fill="black" />
        <Text style={styles.nameText}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical:'2%',
    marginHorizontal:'2%',
    padding: widthToDp(3.5),
    borderWidth: 1,
    borderColor: '#D3D3D3',
    elevation:3
  },
  statusView: {
    borderWidth: 1,
    borderColor: '#3238a8',
    width: widthToDp(20),
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  descText: {
    marginVertical: widthToDp(2),
    color: 'black',
    opacity:0.5,
    fontFamily: 'OpenSans',
  },
  statusText: {
    fontSize: widthToDp(3),
    padding: widthToDp(2),
    fontFamily: 'OpenSans',
    letterSpacing: 0.2,
  },
  MainTxt: {
    fontSize: widthToDp(4),
    fontFamily: 'OpenSans',
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nameText: {
    fontSize: widthToDp(3.5),
    fontFamily: 'OpenSans',
    fontWeight:'bold',
    color: 'black',
    marginLeft: widthToDp(1),
  },
});
