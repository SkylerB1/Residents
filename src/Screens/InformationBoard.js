import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../components/Header/header';
import Notice from '../components/Notice/Notice';

const InformationBoard = () => {
  return (
    <View style={{flex: 1}}>
      <Header text="Notice Board" />
      <ScrollView>
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="1 days ago"
        />
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="2 days ago"
        />
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="3 days ago"
        />
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="4 days ago"
        />
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="5 days ago"
        />
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="6 days ago"
        />
        <Notice
          title="Lift Maintenance"
          description="This is to inform you that the lift will be under maintenance from 1st to 5th December"
          name="Vikas Kumar"
          time="7 days ago"
        />
      </ScrollView>
    </View>
  );
};

export default InformationBoard;

const styles = StyleSheet.create({});
