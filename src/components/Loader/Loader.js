import { StyleSheet, ActivityIndicator, View } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View style={styles.loaderView}>
      <ActivityIndicator size={'large'} color={'#3238a8'} />
    </View>
  );
}

export default Loader

const styles = StyleSheet.create({
  loaderView: {flex: 1, justifyContent: 'center'},
});