import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableHighlight, FlatList, ActivityIndicator, Switch } from "react-native";
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  formatAccessibilityLabel: 'dddd d \'of\' MMMM \'of\' yyyy',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthNamesShort: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec'
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';
export default function Room (props) {
  let { params } = props.route;
  const [loading, setLoading] = useState(true)
	console.log(params);
  useEffect(()=>{
		setLoading(false)
	},[])
  return (
		<SafeAreaView style={styles.container}>
			<View style={styles.boxesContainer}>
				{
					loading ? 
						<View style={styles.loaderContaniner}>
							<ActivityIndicator size={50} />
						</View>
					:
						<Agenda />
				}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: colors.BACKGROUND_DEFAULT,
	},
	loaderContaniner: {
		flex: 1,
		justifyContent: 'center'
	},
  scrollView: {
		flex:1,
	},
	boxesContainer: {
		flex: 1,
	},
  boxes: {
		paddingHorizontal: 30,
	},
	boxContent: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderColor: 'rgba(200,200,200,.2)',
		flex: 1,
		flexWrap: "nowrap",
		padding: 10,
		flexDirection: 'row',
	},
	boxTitle: {
		flex: 1,
		color: '#f1f1f1',
	},
	eletronicIcon: {
		color: 'rgba(100,100,100,.6)',
		marginRight: 10,
	},
	eletronicIconOn: {
		color: '#FFF',
		// marginRight: 10,
	},
});
