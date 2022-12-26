import {StyleSheet, TextInput, View, Text, Image, Platform} from 'react-native';
import React from 'react';
import {heightToDp, widthToDp} from '../Responsive';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  rules,
  control,
  name,
  placeholder,
  secureTextEntry,
  icon,
  simpleInput,
  style,
  textInputStyle,
  keyboardType,
  multiline
}) => {
  const getIcons = () => {
    switch (icon) {
      case 'user':
        return require('../../../assets/images/user.png');
      case 'lock':
        return require('../../../assets/images/lock.png');
      default:
        return null;
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              style ? style : styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            {!simpleInput && <Image style={styles.icons} source={getIcons()} />}
            {!simpleInput && (
              <View
                style={styles.lineBreak}
              />
            )}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={textInputStyle ? textInputStyle : styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType ? keyboardType : 'default'}
              multiline={multiline}
            />
          </View>
          {error && !simpleInput && (
            <Text style={styles.error}>{error.message}</Text>
          )}
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    height: '20%',
    paddingHorizontal: '2%',
    marginVertical: heightToDp(4),
    marginHorizontal: widthToDp(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: widthToDp(4),
    // fontFamily: 'OpenSans',
    // fontWeight: '500',
    color: 'black',
    flex: 1,
    marginLeft:'2.5%'
  },
  lineBreak:{
    borderWidth: 0.5,
    height: heightToDp(7),
    borderColor: '#D3D3D3',
    marginHorizontal: widthToDp(3),
  },
  error: {
    // fontFamily:hjhj
    marginHorizontal: widthToDp(10),
    color: 'red',
    alignSelf: 'stretch',
  },
  icons: {
    width: widthToDp(7),
    height: undefined,
    aspectRatio: 1,
    tintColor: '#3238a8',
  },
});
export default CustomInput;
