import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar } from 'react-native-paper';
import RoomsList from '../components/RoomsList'
import Calendar from '../components/Calendar'
import Room from '../components/Room'
import colors from "../config/colors";

const Stack = createStackNavigator();


const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const CalendarViewTypes = [
	{ type: 'month', description: 'Mês', date: months[new Date().getMonth()]},
	{ type: 'weekly', description: 'Semana', date: weekDays[new Date().getDay()] },
	{ type: 'daily', description: 'Dia', date: new Date().getDate(), default: true },
]

export default function CalendarPage () {
	const DefaultCalendarView = CalendarViewTypes.find(type => type.default)
	const [calendarView, setCalendarView] = useState(DefaultCalendarView)
	
	const changeCalendarView = (type) => {
		console.log(calendarView);
		let index = 0, date
		type = type || calendarView.type
		switch(calendarView.type) {
			case 'month':
				index = 1
				break;
			case 'weekly':
				index = 2
				break;
			case 'daily':
				index = 0
				break;
		}
		setCalendarView({ ...CalendarViewTypes[index], date})
		
	}

	const GetCalendar = () =>  {
		return (<>
			<View style={styles.calendarInsideTextContainer}>
				<Icon name="calendar-blank" size={35} color="#FFF" style={styles.calendarIcon} />
				<Text style={[styles.date, calendarView.type !== 'daily' ? styles.smallCalendartext : null]} >{calendarView.date}</Text>
			</View>
			<Text style={ styles.calendarIconDescription }>{calendarView.description}</Text>
		</>)
	}
	
	const Header = ({ scene, previous, navigation }) => {
		const { options } = scene.descriptor;
		const title =
			options.headerTitle !== undefined
				? options.headerTitle
				: options.title !== undefined
				? options.title
				: scene.route.name;
		
		return (
			<Appbar.Header style={styles.headerContainer} accessibilityStates={null} >
				<View style={styles.textContainer}>
					<TouchableHighlight
						underlayColor="rgba(255,255,255,0.2)"
						onPress={changeCalendarView}
						style={styles.calendarContainer}
					>
						<GetCalendar />
					</TouchableHighlight>
					{previous ? <Appbar.BackAction onPress={()=>navigation.goBack()} color={'#FFF'} accessibilityStates={null} /> : <></>}
					<Appbar.Content titleStyle={ styles.headerTitle } title={title} accessibilityStates={null} />
					<TouchableHighlight
						underlayColor="rgba(255,255,255,0.2)"
						onPress={() => {}}
						style={styles.addIconContainer}
					>
						<Icon 
							style={styles.addIcon}
							name={'plus'} size={25} />
					</TouchableHighlight>
				</View>
			</Appbar.Header>
		)
	}
	
	return (
    <Stack.Navigator
			initialRouteName="RoomsList"
		  screenOptions={({ route, navigation }) => ({
				gestureEnabled: true,
				cardOverlayEnabled: true,
				headerStatusBarHeight: navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 0 : undefined,
				header: ({ scene, previous, navigation }) => (
					<Header scene={scene} previous={previous} navigation={navigation} />
				),
				...TransitionPresets.SlideFromRightIOS,
			})}
		>
      <Stack.Screen name="Calendar" component={Calendar} options={{ title: 'Agenda' }} />
      <Stack.Screen name="room" component={Room} />
    </Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: colors.BACKGROUND_DEFAULT,
		elevation: 0,
		paddingHorizontal: 30,
	},
	textContainer: {
		width: '100%',
		borderBottomWidth: 0.5,
		borderColor: 'rgba(200,200,200,.1)',
		flexDirection: 'row',
		position: 'relative'
	},
	headerTitle: {
		paddingVertical: 13,
		fontSize: 14,
		marginLeft: '-35%',
		alignSelf: 'center',
	},
	addIconContainer: {
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addIcon: {
		color: '#FFF',
	},
  calendarContainer: {
    position: 'relative',
    alignItems: 'flex-start',
		paddingHorizontal: 3,
		minWidth: 100,
		height: 47,
		flexDirection: 'row',
	},
	calendarInsideTextContainer: {
		width: 35,
		height:'100%',
    justifyContent: 'center',
		alignSelf: 'center',
	},
  calendarIcon: {
    position: 'absolute',
  },
  date: {
    fontSize: 11,
		marginTop: 4,
		color: '#FFF',
		alignSelf: 'center',
		fontWeight: 'bold',
	},
	calendarIconDescription: {
		color: '#FFF',
		alignSelf: 'center',
		fontSize: 12,
		fontWeight: 'bold',
	},
	smallCalendartext: {
		fontSize: 9,
	},
});
