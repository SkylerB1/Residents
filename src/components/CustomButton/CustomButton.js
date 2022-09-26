import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { widthToDp, heightToDp } from '../Responsive';
import Reminder from '../../../assets/images/Reminder.svg'

const CustomButton = ({onPress,text,style,loading,icon}) => {
  return (
    <Pressable onPress={onPress} style={style ? style : styles.container}>
      {loading ? (
        <View style={{paddingVertical: heightToDp(4)}}>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (<View style={styles.textView}>
        {icon && <View style={styles.iconMargin}><Reminder width={widthToDp(5.5)} height={heightToDp(5.5)} fill='white' /></View>}
        <Text style={styles.text}>{text}</Text></View>
      )}
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3238a8',
    alignItems: 'center',
    marginHorizontal: widthToDp(10),
    marginTop: heightToDp(8),
    borderRadius: 8,
  },
  text: {
    color: 'white',
    paddingVertical: heightToDp(4),
    fontSize: widthToDp(4.5),
    fontFamily: 'OpenSans',
    // letterSpacing: 1,
    fontWeight: 'bold',
  },
  textView: {flexDirection: 'row', alignItems: 'center'},
  iconMargin: {marginRight: widthToDp(2)},
});
