import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header/header';

const StaffMembers = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar translucent barStyle={'light-content'} />
      <Header text="Staff Members" />
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{textAlign: 'center'}}>
          This screen is under development!
        </Text>
      </View>
    </View>
  );
}

export default StaffMembers

const styles = StyleSheet.create({})