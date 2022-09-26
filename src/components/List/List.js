import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {heightToDp, widthToDp} from '../Responsive';
import Tick from '../../../assets/images/SingleTick.svg';

const List = ({type, checked}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.MainTxt}>{type}</Text>
      {checked && (
        <Tick width={widthToDp(6)} height={heightToDp(6)} fill="#3238a8" />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: widthToDp(3),
    borderRadius: 8,
    alignItems: 'center',
    padding: widthToDp(3),
  },
  MainTxt: {
    fontSize: widthToDp(4.4),
    // fontFamily: 'OpenSans',
    fontWeight: '400',
    color: 'black',
    flex: 1,
    letterSpacing: -0.5,
  },
  StatusView: {
    borderRadius: 20,
  },
  StatusTxt: {
    padding: widthToDp(1.5),
    fontSize: widthToDp(3),
  },
});
