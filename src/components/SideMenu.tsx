import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	Avatar,
	Title,
	Caption,
	Drawer,
	TouchableRipple,
	Switch,
} from 'react-native-paper';

export default function SideMenu (props) {
	const currentUser = auth().currentUser
	const [tt, setTt] = useState(false)
	
	return (
		<DrawerContentScrollView {...props}>
		  <View style={styles.drawerContent}>
				<View style={styles.userInfoSection}>
					<View style={styles.userHeader}>
						<View style={styles.userImage}>
							<Avatar.Image
								source={{ uri: currentUser.photoURL }}
								size={50}
							/>
						</View>
						<View style={styles.userInfo}>
							<Title style={styles.title}>{currentUser.displayName}</Title>
							<Caption style={styles.smallCaption}>{currentUser.email}</Caption>
							<Caption style={styles.smallCaption}>{currentUser.phoneNumber || '+55 51 98172-0738'}</Caption>
						</View>
					</View>
				</View>
				<Drawer.Section style={styles.drawerSection}>
					<DrawerItem
						icon={({ size }) => <Icon name="account-outline" color={'#FFF'} size={size} />}
						labelStyle={styles.menuItemLabel}
						label="Profile"
						onPress={() => {}}
					/>
					<DrawerItem
						icon={({ size }) => <Icon name="tune" color={'#FFF'} size={size} /> }
						labelStyle={styles.menuItemLabel}
						label="Preferences"
						onPress={() => {}}
					/>
					<DrawerItem
						icon={({ size }) => <Icon name="bookmark-outline" color={'#FFF'} size={size} /> }
						labelStyle={styles.menuItemLabel}
						label="Bookmarks"
						onPress={() => {}}
					/>
				</Drawer.Section>
				<Drawer.Section title={<Text style={{color:'#FFF'}}>Preferences</Text>}>
					<TouchableRipple onPress={() => setTt(!tt)}>
						<View style={styles.preference}>
							<Text style={styles.caption}>Dark Theme</Text>
							<View pointerEvents="none">
								<Switch value={tt} />
							</View>
						</View>
					</TouchableRipple>
					<TouchableRipple onPress={() => {}}>
						<View style={styles.preference}>
							<Text style={styles.caption}>RTL</Text>
							<View pointerEvents="none">
								<Switch value={false} />
							</View>
						</View>
					</TouchableRipple>
				</Drawer.Section>
				<Drawer.Section style={styles.drawerSection}>
					<DrawerItem
						icon={({ size }) => <Icon name="exit-run" color={'#FFF'} size={size} />}
						labelStyle={styles.menuItemLabel}
						label="Sair"
						onPress={() => auth().signOut()}
					/>
				</Drawer.Section>
		  </View>
		</DrawerContentScrollView>
	  );
}
const styles = StyleSheet.create({
  drawerStyle: {
		backgroundColor: colors.BACKGROUND_DEFAULT,
	},
	menuItemLabel: {
		color: "#FFF",
	},
	drawerContent: {
	  flex: 1,
	},
	userInfoSection: {
		paddingLeft: 10,
	},
	userHeader:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	userImage: {
		justifyContent: 'center',
		paddingRight: 10,
	},
	userInfo: {},
	title: {
		flex:1,
		color: '#FFF',
	},
	smallCaption: {
		flex:1,
	  fontSize: 12,
		lineHeight: 12,
		color: '#FFF',
	},
	caption: {
		flex:1,
	  fontSize: 14,
		lineHeight: 14,
		color: '#FFF',
		alignSelf: 'center'
	},
	row: {
	  marginTop: 20,
	  flexDirection: 'row',
	  alignItems: 'center',
	},
	section: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  marginRight: 15,
	},
	paragraph: {
	  fontWeight: 'bold',
	  marginRight: 3,
	},
	drawerSection: {
		marginTop: 15,
	},
	preference: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  paddingVertical: 12,
	  paddingHorizontal: 16,
	},
});