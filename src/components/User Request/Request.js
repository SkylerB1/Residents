import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { widthToDp ,heightToDp} from '../Responsive';
import Maintenance from '../../../assets/images/Maintenance.svg';
import Bookings from '../../../assets/images/Bookings.svg';
import NoticeBoard from '../../../assets/images/NoticeBoard.svg';
import Staff from '../../../assets/images/Staff.svg';


const Request = ({route,text1,text2,icon}) => {
    const navigation = useNavigation()

    const getIcons = () => {
      switch (icon) {
        case 'Maintenance':
          return (
            <Maintenance
              width={widthToDp(10)}
              height={heightToDp(10)}
              fill="#3238a8"
            />
          );
        case 'Booking':
          return (
            <Bookings
              width={widthToDp(10)}
              height={heightToDp(10)}
              fill={'#3238a8'}
            />
          );
        case 'Notice':
          return (
            <NoticeBoard
              width={widthToDp(11)}
              height={heightToDp(11)}
              fill={'#3238a8'}
            />
          );
        case 'Staff':
          return (
            <Staff
              width={widthToDp(11)}
              height={heightToDp(11)}
              fill={'#3238a8'}
            />
          );
        default:
          return null;
      }
    };
  return (
      <TouchableOpacity
          style={{alignItems: 'center',marginHorizontal:widthToDp(6),marginTop:heightToDp(20)}}
          disabled={route==''&& true}
          onPress={() => navigation.navigate(route)}>   
          {getIcons()}
          <View style={{marginTop: widthToDp(2)}}>
              <Text style={styles.requestText}>{ text1}</Text>
            <Text style={styles.requestText}>{text2}</Text>
          </View>
        </TouchableOpacity>
  )
}

export default Request

const styles = StyleSheet.create({
  requestText: {
    fontSize: widthToDp(3.5),
    fontFamily: 'OpenSans',
    alignSelf: 'center',
    color: 'black',
    fontWeight: '400',
    opacity: 0.7,
    letterSpacing: -0.5,
  },
});