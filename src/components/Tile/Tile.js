import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthToDp } from '../Responsive';
import { useNavigation } from '@react-navigation/native';

const Tile = ({ item }) => {
    const navigation = useNavigation()
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
            item.case_status === 'Completed'
              ? 'green'
              : item.case_status === 'Rejected by builder' ||
                item.case_status === 'Deleted'
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
                item.case_status === 'Completed' ||
                item.case_status === 'Rejected by builder' ||
                item.case_status === 'Deleted'
                  ? 'white'
                  : '#3238a8',
            },
          ]}>
          {item.case_status}
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