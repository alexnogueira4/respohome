import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";

export default function HelpConfig (props) {
  console.log(props.navigation);
  
  return (
    <TouchableOpacity 
      activeOpacity={0.4}
      onPress={() => {props.navigation.jumpTo('rooms')}}
      style={ styles.container }
    >
      <View style={ styles.main }>
          <Image style={ styles.imageHeader } source={{uri: 'https://image.freepik.com/free-vector/home-party-with-dancing-drinking-people-flat-illustration_198278-130.jpg'}} />
        <View style={ styles.infoContainer }>
          <Text style={ styles.cardTitle }>Amazon Music</Text>
          <Text style={ styles.cardDescription }>
              Ouça suas músicas preferidas em qualquer cômoda da sua casa, é só escolher, e relaxar!
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    width: '100%',
    height:'100%',
    backgroundColor: "#FFF",
  },
  main: {
    width: '100%',
    height:'100%',
  },
  imageHeader: {
    height: '60%',
    width: "100%",
    backgroundColor: 'blue'
  },
  infoContainer: {
    padding: 10,
    paddingTop: 20,
    width: '100%',
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16
  },
  cardDescription: {
    fontSize: 14,
    color: "#777",
    paddingTop: 5,
  },
});
