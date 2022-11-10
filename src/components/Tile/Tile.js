import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthToDp } from '../Responsive';
import { useNavigation } from '@react-navigation/native';

const Tile = ({ item }) => {
  const navigation = useNavigation()
  
  const getStatus = (statusId) => {
    if (statusId === 0) {
      return 'New';
    } else if (statusId === 1) {
      return 'InProgress';
    } else if (statusId === 2) {
      return 'Completed';
    } else if (statusId === 3) {
      return 'Deleted';
    } else if (statusId === 4) {
      return 'RejectedByBuilder';
    } else if (statusId === 5 ) {
      return 'ToBeMonitored';
    } else {
    }
  }
  return (
    <Pressable
      style={styles.mainView}
      onPress={() =>
        navigation.navigate('AmenityBookingDetail', {
          data: item,
        })
      }>
      <Text style={styles.txt}>#{item.case_number}</Text>
      <Text numberOfLines={2} style={[styles.txt, styles.subjectText]}>
        {item.description}
      </Text>
      <View
        style={{
          elevation: 3,
          borderRadius: widthToDp(2),
          backgroundColor:
            item.case_status === 2
              ? 'green'
              : item.case_status === 4 ||
                item.case_status === 3
              ? 'red'
              : 'yellow',
          paddingVertical: '0.5%',
          flex: 0.5,
        }}>
        <Text
          style={[
            styles.txt,
            {
              color:
                item.case_status === 2 ||
                item.case_status === 4 ||
                item.case_status === 3
                  ? 'white'
                  : '#3238a8',
            },
          ]}>
          {getStatus(item.case_status)}
        </Text>
      </View>
    </Pressable>
  );
};

export default Tile

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: '#000',
        marginBottom: '3%',
        borderRadius: 5,
        flexDirection: 'row',
        padding: '4%',
        alignItems: 'center',
    },
    txt: {
        fontSize: widthToDp(4),
        color: 'black',
        // fontFamily: 'OpenSans',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing:-0.3
    },
    subjectText: { flex: 1, marginHorizontal: '5%' },
    
})