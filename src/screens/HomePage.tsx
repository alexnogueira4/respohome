import React, { useState, useRef } from "react";
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { Animated, Dimensions, StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableHighlight, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Weather from '../components/Weather'
import HelpConfig from '../components/HelpConfig'
import Deezer from '../components/Deezer'
import Carousel from 'react-native-snap-carousel';
import { color } from "react-native-reanimated";

const pagesList = [
	{
		title: "Cômodos",
		icon: "lamp",
		description: "Acesse os eletrônicos a partir de um cômodo da casa.",
		id: 1,
		route: 'rooms',
		size: 42
	},
	{
		title: "Eletrônicos",
		icon: "lightbulb-outline",
		description: "Acesse a lista de todos os eletrônicos da residência.",
		id: 2,
		route: 'devices',
		size: 36
	},
	{
		title: "Segurança",
		icon: "security",
		description: "Acesse as opções de segurança.",
		id: 3,
		size: 38
	},
	{
		title: "Configurações",
		icon: "cogs",
		description: "Acesse configurações da casa.",
		id: 4,
		size: 36
	},
	{
		title: "Cenários",
		icon: "sofa",
		description: "Acesse os cenários da residência.",
		id: 5,
		size: 34
	},
	{
		title: "Agenda",
		icon: "calendar-month-outline",
		description: "Agende a ativação e desativação dos eletrônicos da casa.",
		id: 6,
		size: 36
	},
	{
		title: "Alexa",
		icon: "amazon-alexa",
		description: "Configure a integração com seus dispositivos Alexa.",
		id: 7,
		route: 'alexa',
		size: 36
	},
	{
		title: "Ajuda",
		icon: "lifebuoy",
		description: "Precisando de ajuda para configurar a casa?",
		id: 8,
		size: 36
	},
]

const Rrr = ()=>{
	return (
		<View style={{
				backgroundColor:'floralwhite',
				borderRadius: 5,
				height: windowHeight * 0.6,
				padding: 50,
				marginLeft: 25,
				marginRight: 25, }}>
			<Text style={{fontSize: 30}}>tyuhj</Text>
			<Text>bibibaibba</Text>
		</View>
	)

}
const compo = [
	{ Component: Weather, title: 'Previsão do tempo', order: 0, titleBg: '' },
	{ Component: Deezer, title: 'Vamos ouvir música?', order: 1, color: '#3A44A5', titleBg: '#FFF' },
	{ Component: HelpConfig, title: 'Vai uma ajudinha?', order: 2, color: 'purple', titleBg: '#FFF' },
	{ Component: HelpConfig, title: 'Para relaxar', order: 3, color: 'gray', titleBg: '#000' },
	{ Component: HelpConfig, title: 'Novidades', order: 4, color: 'green', titleBg: '' },
	{ Component: HelpConfig, title: 'teste - 6', order: 5, color: 'blue', titleBg: '' },
	{ Component: HelpConfig, title: 'teste - 7', order: 6, color: 'red', titleBg: '' },
	{ Component: HelpConfig, title: 'teste - 8', order: 7, color: 'purple', titleBg: '' },
	{}
]
var carouselItems = [
	{
			title:"Item 1",
			text: "Text 1",
			color: "red",
			order: 0,
	},
	{
			title:"Item 2",
			text: "Text 2",
			color: "green",
			order: 1,
	},
	{
			title:"Item 3",
			text: "Text 3",
			color: "purple",
			order: 2,
	},
	{
			title:"Item 4",
			text: "Text 4",
			color: "blue",
			order: 3,
	},
	{
			title:"Item 5",
			text: "Text 5",
			color: "",
			order: 4,
	},
]
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomePage (props) {
	const [activeIndex, setIndex] = useState(0)
	const [activeTitle, setTitle] = useState(compo[0].title)
	const [bgHeaderTitle, setBgHeaderTitle] = useState(compo[0].titleBg || '#FFF')
	
	const [bgColor, setBgColor] = useState(compo[0].color || colors.BACKGROUND_DEFAULT)
	const [newBgColor, setNewBgColor] = useState(compo[0].color || colors.BACKGROUND_DEFAULT)

	const fadeAnim = new Animated.Value(0);
	var bgbg = fadeAnim.interpolate({
		inputRange: [0, 500],
		outputRange: [bgColor, newBgColor]
	});
	
	Animated.timing(fadeAnim, { toValue: 500, duration: 500, useNativeDriver: false }).start();

	const _renderItem = ({item,index}) => {
		if (!item.Component) return <></>
		var { Component } = item
		return (
			<View style={{
					backgroundColor: !item.transparentBg ? 'floralwhite' : null,
					borderRadius: 5,
					height: windowHeight * 0.6,
					padding: 0,
					elevation: 5,
					borderWidth: 0,
					marginLeft: 15,
					marginRight: 15, }}>
				<Component navigation={props.navigation}/>
			</View>
		)
	}

	return (
		<Animated.View style={{flex: 1, backgroundColor: bgbg }}>
			<View style={styles.homeHeader}>
				<Text style={[styles.headerText, {color: bgHeaderTitle}]}>{activeTitle}</Text>
			</View>
			<View style={{paddingTop: 5,flex:1}}>

				<Carousel
					layout={"stack"}
					layoutCardOffset={19}
					data={compo}
					vertical={true}
					sliderHeight={windowHeight * 0.45}
					itemHeight={windowHeight * 0.45}
					renderItem={_renderItem}
					onSnapToItem = { index => {
						var currentItem = compo.find( item => item.order == index )
						setIndex(index)
						setTitle(currentItem.title)
						setBgHeaderTitle(currentItem.titleBg)
						setBgColor(newBgColor || colors.BACKGROUND_DEFAULT)
						setNewBgColor(currentItem.color || colors.BACKGROUND_DEFAULT )
					}} />
				</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 31,
	},
	homeHeader: {
		// backgroundColor: 'red'
	},
	headerText: {
		alignSelf: 'center',
		fontSize: 18,
		paddingVertical: 15,
	},
  scrollView: {
		marginHorizontal: 0,
		flex:1,
		flexWrap: "wrap",
	},
	boxesContainer: {
		flex: 1,
		// paddingTop: 31,
		backgroundColor: colors.BACKGROUND_DEFAULT,
	},
  boxes: {
		margin: "2%",
		width: "46%",
		// height: 150,
		borderRadius: 3,
		borderColor: colors.BOX_DEFAULT_BORDER_COLOR,
		borderWidth: 1,
    backgroundColor: colors.BOX_DEFAULT_BACKGROUND_COLOR,
	},
	boxContent: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		flexWrap: "nowrap",
		alignContent: 'space-between',
		padding: 10,
	},
	boxIcon: {
		width: 38,
		marginRight: 10,
		marginBottom: 10,
	},
	firstLine: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%',
		maxHeight: '50%'
	},
	boxTitle: {
		flex: 1,
		fontSize: 16,
		color: colors.BOX_TEXT_COLOR,
	},
	boxDescription: {
		fontSize: 12,
		width: '100%',
		color: colors.BOX_TEXT_COLOR,
		height: 60,
		alignSelf: 'flex-end'
	}
});
