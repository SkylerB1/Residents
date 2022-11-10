import {StyleSheet, Text, View, StatusBar, Image,Pressable} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {heightToDp, widthToDp} from '../components/Responsive';
import Menu from '../../assets/images/Menu.svg';
import Location from '../../assets/images/Location.svg';
import Weather from '../../assets/images/Weather.svg';
import Request from '../components/User Request/Request';
import { AuthContext } from '../components/AuthContext/AuthProvider';

const Home = () => {
  const date = useMemo(() => new Date().toDateString().slice(3, 10), []);
  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState('')
  const {signOut} = useContext(AuthContext)

  const getWeatherInfo = async (cityname) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=6b06c6f68853933f09baeb8a2f7175df&units=metric`,
      );

      if (response.status == 200) {
        const data = await response.json()
        let temp = Math.round(data.main.temp)
        setTemp(temp)
        setWeather(data.weather[0].description)
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getWeatherInfo('Sydney');
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar translucent barStyle={'light-content'} />
      <View style={styles.backgroundView}>
        {/* <View style={styles.topView}>
          <Menu width={widthToDp(6)} height={heightToDp(6)} fill="white" />

          <View style={styles.imgBorder}>
            <Image
              style={{width: widthToDp(8), height: heightToDp(8)}}
              source={require('../../assets/images/chatprofile.png')}
            />
          </View>
        </View> */}
        <View style={styles.MainTextView}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.buildingNameText}>XPERT FMS</Text>
        </View>
        <View style={styles.weatherView}>
          {/* <View style={{paddingBottom:widthToDp(2)}}> */}
          <Weather width={widthToDp(14)} height={heightToDp(14)} fill="white" />
          {/* </View> */}
          <View style={styles.weatherTextView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}>
              <View style={styles.weatherContainer}>
                <Text style={styles.tempText}>{ temp}°C</Text>
                <View style={styles.locationView}>
                  <Location
                    width={widthToDp(3)}
                    height={heightToDp(3)}
                    fill="white"
                  />
                  <Text style={styles.locationText}>SYDNEY</Text>
                </View>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.weatherText}>{weather}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Request
          text1="Maintenance"
          text2="Request"
          route="Maintenance"
          icon="Maintenance"
        />
        <Request
          text1="Amenity"
          text2="Bookings"
          route="Amenities"
          icon="Booking"
        />
        <Request text1="Information Board" text2="" route="InformationBoard" icon="Notice" />
        <Request text1="Staff Members" text2="" route="StaffMembers" icon="Staff" />
        {/* <Pressable onPress={signOut}><Text>LOGOUT</Text></Pressable> */}
        {/* <Request
          text1="Notice Board"
          route=""
          icon="Notice"
        /> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundView: {
    height: heightToDp(140),
    backgroundColor: '#3238a8',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  topView: {
    flexDirection: 'row',
    marginTop: heightToDp(20),
    justifyContent: 'space-between',
    marginHorizontal: heightToDp(5),
  },
  imgBorder: {
    width: widthToDp(9),
    height: heightToDp(9),
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainTextView: {marginLeft: heightToDp(5), marginTop: widthToDp(35)},
  welcomeText: {
    color: 'white',
    fontSize: widthToDp(3.5),
    fontFamily: 'OpenSans',
    opacity: 0.5,
    letterSpacing: 1,
  },
  buildingNameText: {
    color: 'white',
    fontSize: widthToDp(7),
    fontFamily: 'OpenSans',
    letterSpacing: 1,
    marginTop: widthToDp(2),
  },
  weatherView: {
    marginHorizontal: heightToDp(5),
    paddingBottom: widthToDp(3),
    marginTop: widthToDp(24),
    flexDirection: 'row',
    // borderWidth:1
  },
  weatherTextView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: widthToDp(2),
  },
  weatherContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  tempText: {
    fontSize: widthToDp(5.5),
    color: 'white',
    fontFamily: 'OpenSans',
  },
  locationView: {flexDirection: 'row', alignItems: 'center'},
  requestText: {
    fontSize: widthToDp(3.5),
    alignSelf: 'center',
    color: 'black',
    fontWeight: '400',
    opacity: 0.7,
    letterSpacing: -0.5,
    fontFamily: 'OpenSans',
  },
  locationText: {
    marginLeft: widthToDp(1.5),
    fontSize: widthToDp(3.5),
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2.5,
    fontFamily: 'OpenSans',
  },
  weatherText: {
    fontSize: widthToDp(3.2),
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.5,
    fontFamily: 'OpenSans',
  },
  date: {
    fontSize: widthToDp(3.2),
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'OpenSans',
    opacity: 0.5,
  },
  card: {
    position: 'absolute',
    bottom: heightToDp(5),
    left: heightToDp(5),
    right: heightToDp(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: widthToDp(110),
    justifyContent: 'space-evenly',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
