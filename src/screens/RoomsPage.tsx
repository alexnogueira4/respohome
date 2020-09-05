import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import RoomsList from '../components/RoomsList'
import Room from '../components/Room'
import colors from "../config/colors";
const Stack = createStackNavigator();

export default function RoomsPage () {
	const Header = ({ scene, previous, navigation }) => {
		const { options } = scene.descriptor;
		const title =
			options.headerTitle !== undefined
				? options.headerTitle
				: options.title !== undefined
				? options.title
				: scene.route.name;
		
		return (
			<Appbar.Header style={styles.headerContainer} >
				<View style={styles.textContainer}>
					{previous ? <Appbar.BackAction onPress={()=>navigation.goBack()} color={'#FFF'} /> : <></>}
					<Appbar.Content titleStyle={ styles.headerTitle } title={title} />
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
      <Stack.Screen name="RoomsList" component={RoomsList} options={{ title: 'Lista de Cômodos' }} />
      <Stack.Screen name="room" component={Room} />
    </Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: colors.BACKGROUND_DEFAULT,
		elevation: 0,
		// flex:1,
		paddingHorizontal: 30,
	},
	textContainer: {
		width: '100%',
		borderBottomWidth: 0.5,
		borderColor: 'rgba(200,200,200,.1)',
		alignSelf: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	headerTitle: {
		// backgroundColor: 'red',
		// flex:1,
		paddingVertical: 13,
		fontSize: 14,
		alignSelf: 'center',
		textAlign:"center",
	},
});
