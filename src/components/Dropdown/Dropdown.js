import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { widthToDp } from '../Responsive';

const Dropdown = ({ rules, control, name,data,zIndex,zIndexInverse,marginLeft,open,setOpen,onOpen,placeholder }) => {
   
  return (
    <View style={[styles.MainView,{marginLeft:marginLeft ? marginLeft : 0}]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <DropDownPicker
            open={open}
            placeholder={placeholder}
            value={value}
            items={data}
            onOpen={onOpen}
            closeOnBackPressed
            setOpen={setOpen}
            listMode="SCROLLVIEW"
            setValue={onChange}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
            onChangeValue={onChange}
            style={[styles.dropDown, {borderColor: error ? 'red' : '#e8e8e8'}]}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            
          />
        )}
      />
    </View>
  );
};

export default Dropdown

const styles = StyleSheet.create({
    MainView:{flex: 2},
  dropDown: {
    width: '100%',
    borderColor: '#e8e8e8',
    zIndex:1
    // marginLeft: widthToDp(33),
  },
  dropDownContainerStyle: {
    width: '100%',
    borderColor: '#e8e8e8',
    // marginLeft: widthToDp(33),
  },
});