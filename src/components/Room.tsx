import React, { useState, useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableHighlight, FlatList, ActivityIndicator, Switch } from "react-native";
import firestore from '@react-native-firebase/firestore';
import {
	Avatar,
	Title,
	Caption,
	Drawer,
	TouchableRipple,
} from 'react-native-paper';

export default function Room (props) {
  const [loading, setLoading] = useState(true)
	const [rooms, setRooms] = useState([])
  let { params } = props.route;
  const [tt, setTt] = useState(false)
  const Collection = firestore().collection('eletronics')
	console.log(params);
  
	useEffect(() => {
    props.navigation.setOptions({ title: params.title })
    const subscriber = Collection
    .where('room', '==', params.key)
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
	
  function updateSwitch(key, val){
    Collection.doc(key).update({ switch: val })
  }
	const PageBox = ({item}) => {
		return (
			<View
				// underlayColor="rgba(200,200,200,0.5)"
				// onPress={() => {}}
				style={styles.boxes}
			>
				<View style={styles.boxContent}>
					<Icon name={item.switch ? 'lightbulb-on-outline' : 'lightbulb-outline'} size={25} style={[styles.eletronicIcon, !item.switch || styles.eletronicIconOn]} />
					<Text style={styles.boxTitle}>{item.name}</Text>
          <Switch 
            trackColor={{ false: "rgba(0,0,0,.5)", true: "#5BCAFB" }}
            thumbColor={"#EEE"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>updateSwitch(item.key, !item.switch)}
            value={item.switch  }
          />
				</View>
			</View>
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
						<FlatList
							data={rooms}
							renderItem={({item}) => <PageBox item={item} />}
							keyExtractor={item => item.key}
							style={styles.scrollView}
							numColumns='1'
						/>
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
