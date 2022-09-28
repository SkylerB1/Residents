import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Header/header';
import { widthToDp, heightToDp } from '../Responsive';
import DetailView from '../DetailView/DetailView';
import { useNavigation } from '@react-navigation/native';
import ImageModal from 'react-native-image-modal';
import Maintenance from '../../../assets/images/Maintenance.svg'


const defectedImages = [
  {url: require('../../../assets/images/defect1.jpg')},
  {
    url: require('../../../assets/images/defect2.jpeg'),
  },
  {
    url: require('../../../assets/images/defect1.jpg'),
  },
  {
    url: require('../../../assets/images/defect2.jpeg'),
  },
];

const AmenityBookingDetail = ({ route }) => {
    
    const { data } = route.params
    // console.log('ROUTE',data)

    const navigation = useNavigation()

//   const [dropDown, setDropDown] = useState(false);

//   const handleDropDown = () => {
//     setDropDown(false);
//   };
  const onSubmit = () => {
    Alert.alert(
      '',
      'Thank you, Your reminder has been sent to the owner.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Amenities'),
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      <Header text="Booking Details" />
      <View
        style={{
          backgroundColor: '#3238a8',
          marginHorizontal: '4%',
          paddingVertical: '2%',
          marginTop: '2%',
          elevation: 5,
          shadowColor: 'black',
        }}>
        <Text
          style={{color: 'white', textAlign: 'center', fontSize: widthToDp(4)}}>
          Case Number {data.case_number}
        </Text>
      </View>
      <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
        <DetailView bold heading="Case Type" details={data.title} />
        <DetailView heading="Priority" details={data.priority} />
        <DetailView heading="Subject" details={data.subject_title} />
        <DetailView heading="Description" details={data.description} />
        <DetailView
          heading="Notes"
          details={data.notes ? data.notes : 'Null'}
        />
        <DetailView heading="Added Date" details={data.added_date} />
        <DetailView
          heading="Due Date"
          details={data.due_date ? data.due_date : 'Null'}
        />
        <DetailView heading="Status" details={data.case_status} />
        <View style={styles.defectedImageView}>
          <View style={{flex: 1}}>
            <View style={styles.defectedImageTextView}>
              <Maintenance
                width={widthToDp(4.5)}
                height={heightToDp(4.5)}
                fill="#3238a8"
              />
              <Text style={styles.text}>Defect's Images</Text>
            </View>
            <View style={styles.imagesView}>
              <ImageModal
                resizeMode="cover"
                imageBackgroundColor="black"
                style={{width: widthToDp(78.5), height: heightToDp(40)}}
                isTranslucent={true}
                source={defectedImages[0].url}
              />
              <View style={styles.imageView}>
                {defectedImages.length > 0 &&
                  defectedImages.map((item, index) => {
                    if (index > 0) {
                      return (
                        <ImageModal
                          key={index}
                          imageBackgroundColor="black"
                          style={{
                            width: widthToDp(20),
                            height: heightToDp(20),
                          }}
                          source={item.url}
                        />
                      );
                    }
                  })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* {data.case_status === 'Completed' ? null :
      <CustomButton
        onPress={onSubmit}
        text={'Send Reminder'}
        style={styles.btn}
        icon="Reminder"
      />} */}
    </SafeAreaView>
  );
};

export default AmenityBookingDetail;

const styles = StyleSheet.create({
  root: {flex: 1},
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    margin: widthToDp(4),
    borderRadius: widthToDp(2),
  },
  heading: {
    color: '#3238a8',
    fontSize: widthToDp(5),
    fontWeight: 'bold',
    margin: widthToDp(3),
    letterSpacing: 1,
  },
  line: {
    flex: 1,
    borderWidth: 0.4,
    borderColor: '#3238a8',
    marginHorizontal: widthToDp(3),
  },
  btn: {
    backgroundColor: '#3238a8',
    alignItems: 'center',
    marginHorizontal: widthToDp(4),
    marginBottom: heightToDp(4),
    borderRadius: 8,
  },
  defectedImageView: {
    margin: widthToDp(4),
    marginHorizontal: widthToDp(5),
    flexDirection: 'row',
  },
  defectedImageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: widthToDp(4.3),
    color: '#3238a8',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontFamily: 'OpenSans',
    marginLeft: '1%',
    // textAlign: 'center',
  },
  imagesView: {marginTop: '2%', marginHorizontal: '2%'},
  imageView: {
    flexDirection: 'row',
    marginTop: '4%',
    flexWrap: 'wrap',
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
});

