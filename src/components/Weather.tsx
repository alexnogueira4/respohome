import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import { StyleSheet, Image, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";

export default function Weather (props) {
	const [weather, setWheater] = useState({})

	const getWeather = async () => {
		try {
			console.log('fghjk');
			
			fetch("https://api.hgbrasil.com/weather?key=bf42b280&user_ip=remote", { method: "GET"})
				.then(response => response.text())
				.then(result => {
					result = JSON.parse(result)
					console.log(result['results']);
					
					setWheater(result["results"])
				})
				.catch(error => console.error('error', error));
		} catch (error) {
			console.log(error);
		}
		return '';
	}
	
	useEffect(()=> {getWeather()}, [])

	return (
		<View style={styles.container}>
	 		<View style={styles.cityContainer}>
	 			<Text style={[styles.whiteText, styles.cityName]}>{weather.city}</Text>
	 		</View>
	 		<View style={styles.tempContainer}>
	 			<View style={styles.currentTempContainer}>
	 				<View style={styles.currentTempIcon}>
	 					<Icon name="weather-pouring" size={90} style={[styles.iconCurrentTemp, styles.whiteText]} />
	 					<Text style={[styles.whiteText, {fontSize:14}]}>{weather.description}</Text>
	 				</View>
	 				<View style={styles.currentTemp}>
	 					<Text style={[styles.whiteText, styles.temp]}>{weather.temp}ºC</Text>
	 				</View>
	 			</View>
	 			<View style={styles.maxMinContainer}>
	 				<View style={[styles.tempMaxMin, styles.tempMax]}>
	 					<Icon name="arrow-up" size={24} style={[styles.iconTempMaxMin, styles.whiteText]} />
	 					<Text style={[styles.textMaxMin, styles.whiteText]}>
	 						{weather.forecast && weather.forecast[0] ? weather.forecast[0].max : ''}ºC
	 					</Text>
	 				</View>
	 				<View style={styles.tempMaxMin}>
	 					<Icon name="arrow-down" size={24} style={[styles.iconTempMaxMin, styles.whiteText]} />
	 					<Text style={[styles.textMaxMin, styles.whiteText]}>
	 						{weather.forecast && weather.forecast[0] ? weather.forecast[0].min : ''}ºC
	 					</Text>
	 				</View>
	 			</View>
	 		</View>
	 		<View style={styles.tempoInfo}>
	 			<Text style={[styles.whiteText, styles.infoIcons]}><Icon name="weather-sunset-up" size={20} /> {weather.sunrise}</Text>
	 			<Text style={[styles.whiteText, styles.infoIcons]}><Icon name="weather-sunset-down" size={20} /> {weather.sunset}</Text>
	 			<Text style={[styles.whiteText, styles.infoIcons]}><Icon name="weather-windy" size={20} /> {weather.wind_speedy}</Text>
	 			<Text style={[styles.whiteText, styles.infoIcons]}><Icon name="water-outline" size={20} /> {weather.humidity} %</Text>
	 		</View>
		</View>
	)
}
const styles = StyleSheet.create({
  container: {
		flex:1,
		padding: 20,
		paddingBottom: 30,
		paddingTop: 30,
		// backgroundColor: '#DDD',
		height: '100%',
		borderRadius: 5
	},
	cityContainer: {
		alignSelf: 'flex-end',
	},
	cityName: {
		fontSize: 16
	},
	whiteText: {
		color: "#333",
	},
	tempContainer: {
		flexWrap: "wrap",
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	currentTempContainer:{
		width: '100%',
		flexWrap: "wrap",
		alignSelf: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	currentTempIcon:{
		alignSelf: 'center',
		justifyContent: 'center'
	},
	iconCurrentTemp: {
		color: '#FFF',
	},
	maxMinContainer: {
		marginTop: 10,
		flexWrap: "wrap",
		alignSelf: 'flex-end',
		flexDirection: 'row',
	},
	temp: {
		alignSelf: 'flex-end',
		fontSize: 80,
		fontWeight: '100',
	},
	tempMax: {
		alignSelf: 'flex-end',
		paddingRight: 20
	},
	tempMaxMin: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
	},
	textMaxMin: {
		fontSize: 20,
	},
	iconTempMaxMin: {
		paddingRight: 5,
		color: "#FFF",
		alignSelf: 'center',
	},
	tempoInfo: {
		flex:1,
		marginTop: 20,
		flexWrap: "wrap",
		alignSelf: 'flex-end',
		justifyContent: 'space-between'
	},
	infoIcons: {
		paddingTop: 10,
	},
});
