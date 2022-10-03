import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import Header from '../components/Header/header';
import CustomButton from '../components/CustomButton/CustomButton';
import {heightToDp, widthToDp} from '../components/Responsive';
import CustomInput from '../components/CustomInput/CustomInput';
import {Controller, useForm} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import Calendar from '../../assets/images/Calendar.svg';
import Photo from '../../assets/images/Photo.svg';
// import Video from '../../assets/images/Video.svg';
import Gallery from '../../assets/images/Gallery.svg';
import ImagePicker from 'react-native-image-crop-picker';
import Cross from '../../assets/images/Cross.svg';
import {API_URL} from '@env';
import {
  postFile,
  postRequest,
  getRequest,
} from '../components/API_Requests/Api_Request';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ScrollView as GestureHandlerScrollView} from 'react-native-gesture-handler';
import Dropdown from '../components/Dropdown/Dropdown';
import {AuthContext} from '../components/AuthContext/AuthProvider';

const MaintenanceForm = ({route, navigation}) => {
  const {type, id} = route.params;

  // const type = 'test'
  // const id = 1

  const {control, handleSubmit} = useForm();
  const date = new Date();
  const [open, setOpen] = useState(false);
  const [attachements, setAttachments] = useState([]);
  const photoUrl = useMemo(() => API_URL + 'file-upload-for-cases', []);
  const FormUrl = useMemo(() => API_URL + 'create-case', []);
  const SubjectUrl = useMemo(() => API_URL + 'get-subjects', []);
  const CategoryUrl = useMemo(() => API_URL + 'get-categories', []);
  const [loading, setLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  // const [defectedImages, setDefectedImages] = useState([])
  const [subjects, setSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOpen, setCategryOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  const {userData} = useContext(AuthContext);
  const priorities = useMemo(() => {
    return [
      {
        label: 'Low',
        value: 'Low',
      },
      {
        label: 'Medium',
        value: 'Medium',
      },
      {
        label: 'High',
        value: 'High',
      },
    ];
  }, []);

  const onSubmit = async data => {
    setLoading(true);
    if (attachements.length == 0) {
      setLoading(false);
      setImageSelected(true);
    } else {
      let formData = new FormData();

      attachements.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      // data.append('images', attachements);

      const response = await postFile(photoUrl, formData);

      if (response.status == 200) {
        // console.log(response.data)
        let formData = {
          userId: userData.id,
          caseTypeId: id,
          addedDate: data.date,
          priority: data.Priority,
          jobArea: data.JobArea,
          apartmentNo: null,
          company: null,
          contact: data.Contact,
          subject: data.Subject,
          category_id: data.Category,
          description: data.Description,
          notes: data.Notes,
          quotes: null,
          eMail: userData.email,
          defectedImages: response.data,
        };
        // console.log({formData:formData})
        const FormResponse = await postRequest(FormUrl, formData);

        if (FormResponse.status == 200) {
          setLoading(false);
          Alert.alert(
            'Success',
            'Thank You! Your request has been submitted and is being sent to building owner.',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Home'),
              },
            ],
          );
        } else {
          setLoading(false);
          console.log(FormResponse.data);
          Alert.alert(
            'Error',
            'Some Error occured while submitting the form. Please try after some time.',
          );
        }
      } else {
        setLoading(false);
        Alert.alert(
          'Error',
          'Some Error occured while uploading image. Please try after some time.',
        );
      }
    }
  };

  const handleDate = (value, onChange) => {
    setOpen(false);
    let date = new Date(value).toLocaleDateString('en-GB');
    onChange(date);
    // setDate(date);
  };

  const handleDropDown = () => {
    setPriorityOpen(false);
    setSubjectOpen(false);
    setCategryOpen(false);
  };

  const openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        compressImageQuality: 0.7,
        mediaType: 'photo',
        forceJpg: true,
      });
      let imageData = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
      // let defectedImageName = {
      //   name: image.path.substring(image.path.lastIndexOf('/') + 1)
      // };
      setAttachments(prevImage => [...prevImage, imageData]);
      // setDefectedImages(prevImage => [...prevImage,defectedImageName])
    } catch (error) {
      console.log(error);
    }
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      compressImageQuality: 0.7,
      mediaType: 'photo',
      forceJpg: true,
      multiple: true,
    })
      .then(images => {
        images.forEach(image => {
          let imageData = {
            uri: image.path,
            type: image.mime,
            name: image.path.substring(image.path.lastIndexOf('/') + 1),
          };
          // let defectedImageName = {
          //   name: image.path.substring(image.path.lastIndexOf('/') + 1),
          // };
          setAttachments(prevImage => [...prevImage, imageData]);
          // setDefectedImages(prevImage => [...prevImage, defectedImageName]);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getDropDownData = async () => {
    let categories = await getRequest(CategoryUrl);
    let subject = await getRequest(SubjectUrl);

    if (categories.status == 200) {
      let item = [];
      categories.data.forEach(element => {
        item.push({
          label: element.category_title,
          value: element.category_id,
        });
      });
      setCategories(item);
    }
    if (subject.status == 200) {
      let item = [];
      subject.data.forEach(element => {
        item.push({
          label: element.subject_title,
          value: element.subject_id,
        });
      });
      setSubjects(item);
    }
  };
  useEffect(() => {
    getDropDownData();
  }, []);
  // useEffect(() => {
  //   console.log('Category',categories)
  // }, [categories])
  // useEffect(() => {
  //   console.log('Subject',subjects);
  // }, [subjects]);
  const removeImage = key => {
    const newAttachments = attachements.filter((value, index) => key != index);
    // const newDefetedImages =  defectedImages.filter((value, index) => key != index)

    setAttachments(newAttachments);
    // setDefectedImages(newDefetedImages)
  };

  const onPriorityOpen = () => {
    setSubjectOpen(false);
    setCategryOpen(false);
  };
  const onCategoryOpen = () => {
    setSubjectOpen(false);
    setPriorityOpen(false);
  };
  const onSubjectOpen = () => {
    setPriorityOpen(false);
    setCategryOpen(false);
  };

  // useEffect(() => {
  //   console.log(userData)
  // },[userData])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.root}>
        <Header text="Maintenance Request" />
        <View style={{marginTop: heightToDp(3)}}>
          <Text style={styles.stepText}>Step 2</Text>
          <Text style={styles.typeText}>Please fill all the below fields.</Text>
          {imageSelected && (
            <Text style={[styles.errText]}>
              Please attach some defect's pictures.
            </Text>
          )}
        </View>
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          style={styles.mainView}>
          <Pressable onPress={handleDropDown}>
            <Text style={styles.heading}>Case Information</Text>
            <View style={styles.line} />
            <View style={styles.inputView}>
              <Text style={styles.txt}>Case Type</Text>
              <Text>{type}</Text>
            </View>

            <View style={styles.inputView}>
              <Text style={[styles.txt]}>Date</Text>
              <Controller
                control={control}
                name="date"
                rules={{required: true}}
                render={({field: {value, onChange}, fieldState: {error}}) => (
                  <>
                    <Pressable
                      onPress={() => setOpen(true)}
                      style={[
                        styles.inputDate,
                        {
                          marginLeft: widthToDp(30),
                          borderColor: error ? 'red' : '#e8e8e8',
                        },
                      ]}>
                      <Text style={{padding: widthToDp(2), flex: 1}}>
                        {value}
                      </Text>
                      <View
                        style={{
                          marginHorizontal: '5%',
                        }}>
                        <Calendar
                          width={widthToDp(5.5)}
                          height={heightToDp(5.5)}
                          fill="#3238a8"
                        />
                      </View>
                    </Pressable>
                    <DatePicker
                      modal
                      open={open}
                      mode="date"
                      date={date}
                      onConfirm={date => handleDate(date, onChange)}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                  </>
                )}
              />
            </View>
            <View style={[styles.inputView, {zIndex: 3}]}>
              <Text style={[styles.txt, {flex: 0}]}>Priority</Text>
              <Dropdown
                name="Priority"
                control={control}
                placeholder="Select priority"
                open={priorityOpen}
                setOpen={setPriorityOpen}
                onOpen={onPriorityOpen}
                rules={{required: true}}
                data={priorities}
                marginLeft={widthToDp(36)}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
            {/* <Text style={styles.heading}>Apartment Information</Text>
            <View style={styles.line} />
            <View style={styles.inputView}>
              <Text style={styles.txt}>Apartment No</Text>
              <CustomInput
                name="ApartmentNo"
                placeholder=""
                control={control}
                rules={{required: true}}
                simpleInput
                style={[styles.input, {flex: 1, justifyContent: 'center'}]}
                keyboardType="numeric"
                textInputStyle={styles.textInputStyle}
              />
            </View> */}

            <Text style={styles.heading}>Job Information</Text>
            <View style={styles.line} />
            <View style={styles.inputView}>
              <Text style={styles.txt}>Job Area</Text>
              <CustomInput
                name="JobArea"
                placeholder=""
                control={control}
                rules={{required: true}}
                simpleInput
                style={styles.input}
              />
            </View>
            <View style={[styles.inputView, {zIndex: 2}]}>
              <Text style={styles.txt}>Category</Text>
              <Dropdown
                name="Category"
                control={control}
                placeholder="Select a category"
                open={categoryOpen}
                setOpen={setCategryOpen}
                onOpen={onCategoryOpen}
                rules={{required: true}}
                data={categories}
                zIndex={2000}
                zIndexInverse={2000}
              />
            </View>
            <View style={[styles.inputView, {zIndex: 1}]}>
              <Text style={styles.txt}>Subject</Text>
              <Dropdown
                name="Subject"
                control={control}
                open={subjectOpen}
                placeholder="Select a subject"
                setOpen={setSubjectOpen}
                onOpen={onSubjectOpen}
                rules={{required: true}}
                data={subjects}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.txt}>Description</Text>
              <CustomInput
                name="Description"
                placeholder=""
                control={control}
                rules={{required: true}}
                simpleInput
                style={styles.input}
                multiline
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.txt}>Contact No</Text>
              <CustomInput
                name="Contact"
                placeholder=""
                control={control}
                rules={{
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: /^\d+$/,
                }}
                simpleInput
                style={styles.input}
                keyboardType="numeric"
                // textInputStyle={styles.textInputStyle}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.txt}>Notes</Text>
              <CustomInput
                name="Notes"
                placeholder=""
                control={control}
                rules={{required: true}}
                simpleInput
                style={styles.input}
                multiline
              />
            </View>
            <Text style={styles.heading}>Attachments</Text>
            <View style={styles.line} />
            <GestureHandlerScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{flex: 1, marginTop: '1.5%'}}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
              }}>
              {attachements.length > 0 &&
                attachements.map((image, index) => {
                  return (
                    // <Image
                    //   key={index}
                    //   style={styles.img}
                    //   source={{uri: image.uri}}
                    // />
                    <View
                      key={index}
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <ImageBackground
                        style={styles.img}
                        imageStyle={{borderRadius: 5}}
                        source={{uri: image.uri}}>
                        <Pressable
                          onPress={() => removeImage(index)}
                          style={styles.deleteImageView}>
                          <Cross
                            width={widthToDp(2.5)}
                            height={heightToDp(2.5)}
                            fill="white"
                          />
                        </Pressable>
                      </ImageBackground>
                    </View>
                  );
                })}

              {/* <Text style={{position: 'absolute',right:0}}>Remove Photo</Text> */}
            </GestureHandlerScrollView>
            <View style={styles.attachements}>
              <TouchableOpacity onPress={openCamera}>
                <Photo
                  width={widthToDp(10)}
                  height={heightToDp(10)}
                  fill="#3238a8"
                />
                <Text>Photo</Text>
              </TouchableOpacity>
              {/* <View>
            <Video
              width={widthToDp(10)}
              height={heightToDp(10)}
              fill="#3238a8"
            />
            <Text>Video</Text>
          </View> */}
              <Pressable onPress={openGallery}>
                <Gallery
                  width={widthToDp(10)}
                  height={heightToDp(10)}
                  fill="#3238a8"
                />
                <Text>Gallery</Text>
              </Pressable>
            </View>
          </Pressable>
        </ScrollView>

        <CustomButton
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          text="Submit"
          style={styles.btn}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default MaintenanceForm;

const styles = StyleSheet.create({
  root: {flex: 1},
  mainView: {
    flex: 1,
    borderRadius: 10,
    margin: widthToDp(3),
    paddingHorizontal: widthToDp(3),
    backgroundColor: 'white',
  },
  typeText: {
    // fontFamily: 'OpenSans',
    color: 'black',
    opacity: 0.5,
    marginLeft: widthToDp(3),
  },
  errText: {
    opacity: 0.5,
    color: 'red',
    fontSize: widthToDp(3.5),
    marginTop: '2%',
    marginHorizontal: '3%',
  },
  stepText: {
    color: '#3238a8',
    fontSize: widthToDp(5.5),
    fontWeight: '700',
    marginLeft: widthToDp(3),
  },
  heading: {
    color: '#3238a8',
    fontSize: widthToDp(5),
    // fontFamily: 'OpenSans',
    marginBottom: widthToDp(2),
    letterSpacing: 1,
    fontWeight: 'bold',
    marginTop: widthToDp(3),
  },
  line: {flex: 1, borderWidth: 0.4, borderColor: '#3238a8'},
  btn: {
    backgroundColor: '#3238a8',
    alignItems: 'center',
    marginHorizontal: widthToDp(5),
    borderRadius: 8,
    marginVertical: widthToDp(5),
  },
  txt: {
    fontSize: widthToDp(4.2),
    color: 'black',
    fontWeight: '400',
    // letterSpacing: -0.5,
    flex: 1,
    // borderWidth:1
    // fontFamily: 'OpenSans',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: widthToDp(3),
  },
  input: {
    borderWidth: 1,
    height: undefined,
    aspectRatio: 5,
    backgroundColor: 'white',
    borderColor: '#e8e8e8',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal:'3%',
    // marginLeft: widthToDp(10),
    flex: 2,
    alignItems: 'center',
  },
  inputDate:{
    borderWidth:1,
    flexDirection:'row',
    flex:2,
    alignItems:'center',
    paddingVertical:'2%',
    borderRadius:8

  },
  textInputStyle: {
    fontSize: widthToDp(4.5),
    flex: 1,
    fontWeight: '500',
    color: 'black',
  },
  dropDown: {
    width: widthToDp(40),
    borderColor: '#e8e8e8',
    marginLeft: widthToDp(33),
  },
  dropDownContainerStyle: {
    width: widthToDp(40),
    borderColor: '#e8e8e8',
    marginLeft: widthToDp(33),
  },
  img: {
    width: widthToDp(20),
    height: heightToDp(20),
    margin: widthToDp(2),
    borderRadius: widthToDp(2),
  },
  attachements: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: heightToDp(5),
  },
  removeIconView: {
    position: 'absolute',
    right: widthToDp(-3.5),
    top: heightToDp(-3),
  },
  deleteImageView: {
    position: 'absolute',
    top: -heightToDp(1.8),
    right: -widthToDp(1.8),
    backgroundColor: 'red',
    borderRadius: 50,
    padding: widthToDp(1),
    borderWidth: 1,
    borderColor: 'white',
  },
});
