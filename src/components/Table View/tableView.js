import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {heightToDp, widthToDp} from '../Responsive';
import {Col, Row, Grid} from 'react-native-easy-grid';
import { useNavigation } from '@react-navigation/native';
const TableView = ({ description, ticket,case_status,data }) => {
  
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('AmenityBookingDetail', {
        data:data
      })}>
        <Grid>
          <Col style={{borderLeftWidth: 1}}>
            <Row style={styles.row}>
              <Text style={styles.MainTxt}>#{ticket}</Text>
            </Row>
          </Col>
          <Col size={widthToDp(1)}>
            <Row style={[styles.row]}>
              <Text style={styles.MainTxt}>{description}</Text>
            </Row>
          </Col>
          <Col size={widthToDp(0.5)}>
            <Row style={[styles.row, {flexWrap: 'nowrap'}]}>
              <Text
                style={[
                  styles.MainTxt,
                  {
                    backgroundColor: case_status === 'Completed'  ? 'green' : 'yellow',
                    color: case_status === 'Completed' ? 'white' : 'black',
                  },
                ]}>
                {case_status}
              </Text>
            </Row>
          </Col>
        </Grid>
      </Pressable>
    </View>
  );
};

export default TableView;

const styles = StyleSheet.create({
  container: {},
  row: {
    borderWidth: 1,
  },
  MainTxt: {
    fontSize: heightToDp(4),
    color: 'black',
    fontFamily: 'OpenSans',
    flex: 1,
    letterSpacing: -0.5,
    padding: widthToDp(2),
  },
  StatusView: {
    borderRadius: 20,
  },
  StatusTxt: {
    padding: widthToDp(1.5),
    fontSize: widthToDp(3),
  },
});
