import React from 'react';
import { useWindowDimensions, ActivityIndicator, StyleSheet, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from "../config/colors";
import I18n from '../i18n/locales'
import SideMenu from './SideMenu'
import BottomTabs from './BottomTabs'
const Drawer = createDrawerNavigator();

export default function Main (props) {
	return (
		<>
			<StatusBar backgroundColor={colors.STATUS_BAR_COLOR} />
			<NavigationContainer>
				<Drawer.Navigator
					drawerStyle={styles.drawerStyle}
					drawerContent={props => <SideMenu {...props} />}
					drawerContentOptions={{
						itemStyle: { marginVertical: 0, marginHorizontal: 0 },
					}}
				>
					<Drawer.Screen name="home" component={BottomTabs} options={{ drawerLabel: I18n.t('main.menu.homePageLabel') }}/>
				</Drawer.Navigator>
			</NavigationContainer>
		</>
	)
}
const styles = StyleSheet.create({
  drawerStyle: {
		backgroundColor: colors.BACKGROUND_DEFAULT,
	}
});