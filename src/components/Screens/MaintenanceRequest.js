import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from '../Header/header';
import CustomButton from '../CustomButton/CustomButton';
import {widthToDp} from '../Responsive';
import List from '../List/List';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';
import {getRequest} from '../API_Requests/Api_Request';
import Loader from '../Loader/Loader';

const MaintenanceRequest = () => {
  const [selectedItem, setItem] = useState(null);
  const [itemID,setItemId] = useState(0)
  const [showError, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const url = useMemo(() => API_URL + 'get-case-type', []);
  const [loading,setLoading] = useState(false)

  const getRequestType = async () => {
    const response = await getRequest(url);

    if (response.status == 200) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getRequestType();
  }, []);
  const onSubmit = () => {
    if (selectedItem == null) {
      setError(true);
    } else {
      navigation.navigate('MaintenanceForm', {
        type: selectedItem,
        id:itemID

      });
    }
  };
  
  const handleSelectedItem = (type,id) => {
    if (selectedItem == type) {
      setItem(null);
    } else {
      setItem(type);
      setItemId(id);
      setError(false);
    }
  };
  const renderList = ({item}) => {
    return (
      <Pressable onPress={() => handleSelectedItem(item.title,item.id)}>
        <List
          key={item.id}
          type={item.title}
          checked={selectedItem == item.title ? true : false}
        />
      </Pressable>
    );
  };

  

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent barStyle={'light-content'} />
      <Header text="Maintenance Request" />
      <View style={{marginVertical: widthToDp(4)}}>
        <Text style={styles.stepText}>Step 1</Text>
        <Text style={styles.typeText}>
          What type of maintenance do you require.
        </Text>
      </View>
      <View style={styles.listView}>
        {data.length == 0 ? (
          <Loader />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderList}
          />
        )}
      </View>
      {showError && (
        <Text
          style={{
            color: 'red',
            fontSize: widthToDp(3.2),
            marginLeft: widthToDp(3),
          }}>
          Please select one request type to move to the next step.
        </Text>
      )}
      <CustomButton onPress={onSubmit} text="Next Step" style={styles.btn} />
    </View>
  );
};

export default MaintenanceRequest;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#3238a8',
    alignItems: 'center',
    marginHorizontal: widthToDp(3),
    borderRadius: 8,
    marginVertical: widthToDp(5),
  },
  typeText: {
    // fontFamily: 'OpenSans',
    color: 'black',
    opacity: 0.5,
    marginLeft: widthToDp(3),
  },
  stepText: {
    color: '#3238a8',
    fontSize: widthToDp(5.5),
    fontWeight: '700',
    marginLeft: widthToDp(3),
    // fontFamily: 'OpenSans',
  },
  listView: {flex: 1},
});
