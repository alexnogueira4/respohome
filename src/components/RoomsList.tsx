import React, { useState, useEffect } from "react";
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableHighlight, FlatList, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

export default function RoomsList (props) {
  const [loading, setLoading] = useState(true)
	const [rooms, setRooms] = useState([])
	
	useEffect(() => {
		const subscriber = firestore()
		.collection('rooms')
		.onSnapshot(querySnapshot => {
      const rooms = [];

      querySnapshot.forEach(documentSnapshot => {
        rooms.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
			
      setRooms(rooms);
      setLoading(false);
    });		
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
	
	const PageBox = ({item}) => {
		return (
			<TouchableHighlight
				underlayColor="rgba(255,255,255,0.1)"
				onPress={() => props.navigation.navigate('room', { 'title': item.name, key: item.key })}
				style={styles.boxes}
			>
				<View style={styles.boxContent}>
					<Text style={styles.boxTitle}>{item.name}</Text>
					<Icon name={'chevron-right'} style={ styles.boxIcon } size={25} color="#FFF" />
				</View>
			</TouchableHighlight>
		)
	};

  return (
		<SafeAreaView style={styles.container}>
			<View style={styles.boxesContainer}>
				{
					loading ? 
						<View style={styles.loaderContaniner}>
							<ActivityIndicator size={50} />
						</View>
					:
						<>
							<FlatList
								data={rooms}
								renderItem={({item}) => <PageBox item={item} />}
								keyExtractor={item => item.key}
								style={styles.scrollView}
								numColumns='1'
							/>
						</>
				}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
		backgroundColor: colors.BACKGROUND_DEFAULT,
	},
  boxes: {
		padding: 30,
		paddingVertical: 0,
	},
	boxContent: {
		flex: 1,
		flexWrap: "nowrap",
		flexDirection: 'row',
		// backgroundColor: 'red',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderColor: 'rgba(200,200,200,.2)',
	},
	boxTitle: {
		flex: 1,
		color: colors.BOX_TEXT_COLOR,
	},
	boxIcon: {
		alignSelf: 'center',
	},
});
