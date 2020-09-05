import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../screens/HomePage'
import RoomsPage from '../screens/RoomsPage'
import CalendarPage from '../screens/CalendarPage'
const Drawer = createDrawerNavigator();

const Tab = createMaterialBottomTabNavigator();

const Alexa = ({navigation}) => (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Alexa</Text></View>)
const Devices = (aaa) => {
  let { params } = aaa.route;
  [params].map(pp=>{console.log('jjj', pp.room)})
  let {navigation} = aaa
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {[params].map(p => <Text>Você selecionou - {p.room}</Text>) }
      {/* <Text>Dispositivos, {JSON.stringify(params)}</Text> */}
    </View>
  )
}

export default function BottomTabs () {
  return (
    <Tab.Navigator
      initialRouteName="agenda"
      labeled={true}
      shifting={false}
      sceneAnimationEnabled={true}
      barStyle={{ backgroundColor: colors.BACKGROUND_DEFAULT }}
    >
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{
          tabBarLabel: <Text style={styles.title}>Início</Text>,
          tabBarIcon: ({color})=> <Icon name='home' size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="rooms"
        component={RoomsPage}
        options={{
          tabBarLabel: <Text style={styles.title}>Cômodos</Text>,
          tabBarIcon: ({color})=> <Icon name='lamp' size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="alexa"
        component={Alexa}
        options={{
          tabBarLabel: <Text style={styles.title}>Alexa</Text>,
          tabBarIcon: ({color})=> <Icon name='amazon-alexa' size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="devices"
        component={Devices}
        options={{
          tabBarLabel: <Text style={styles.title}>Dispositivos</Text>,
          tabBarIcon: ({color})=> <Icon name='cellphone-link' size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="agenda"
        component={CalendarPage}
        options={{
          tabBarLabel: <Text style={styles.title}>Agenda</Text>,
          tabBarIcon: ({color})=> <Icon name='calendar-month-outline' size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize:11
  }
})