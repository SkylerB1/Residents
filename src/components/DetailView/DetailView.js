import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useMemo} from 'react';
import {widthToDp} from '../Responsive';
import DropDownPicker from 'react-native-dropdown-picker';

const DetailView = ({bold,heading, details, dropdown, input, dropDown, setDropDown}) => {
  const [value, setValue] = useState('');
  const items = useMemo(() => {
    return [
      {
        label: 'Yet to start',
        value: 0,
      },
      {
        label: 'In-Progress',
        value: 1,
      },
      {
        label: 'Completed',
        value: 2,
      },
    ];
  }, []);

  return (
    <View style={styles.itemView}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>{heading}</Text>
      </View>
      <View style={styles.detailContainer}>
        {details && (
          <Text style={[styles.detailsText,{fontStyle:details == 'Null'?'italic':'normal'}]}>
            {details}
          </Text>
        )}
        {dropdown && (
          <DropDownPicker
            open={dropDown}
            dropDownDirection={'TOP'}
            value={value}
            items={items}
            placeholder="Select status"
            setOpen={setDropDown}
            listMode="SCROLLVIEW"
            setValue={setValue}
            onChangeValue={value => setValue(value)}
            style={styles.dropDown}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            closeOnBackPressed
          />
        )}
        {input && <TextInput style={styles.input} multiline />}
      </View>
    </View>
  );
};

export default DetailView;

const styles = StyleSheet.create({
  itemView: {
    margin: widthToDp(4),
    marginHorizontal: widthToDp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: widthToDp(4.3),
    color: '#3238a8',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontFamily: 'OpenSans',
  },
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    // alignItems: 'center',
    // borderWidth:1
  },
  detailsText: {
    fontSize: widthToDp(4),
    fontFamily: 'OpenSans',
  },
  dropDown: {
    width: widthToDp(40),
    borderColor: '#e8e8e8',
  },
  dropDownContainerStyle: {
    width: widthToDp(40),
    borderColor: '#e8e8e8',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 5,
    width: widthToDp(40),
    fontFamily: 'OpenSans',
  },
});
