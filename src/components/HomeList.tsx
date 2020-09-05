import React from "react";
import colors from "../config/colors";
import I18n from '../i18n/locales'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableHighlight, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Weather from '../components/Weather'

const pagesList = [
	{
		title: "Cômodos",
		icon: "lamp",
		description: "Acesse os eletrônicos a partir de um cômodo da casa.",
		id: 1,
		size: 42
	},
	{
		title: "Eletrônicos",
		icon: "lightbulb-outline",
		description: "Acesse a lista de todos os eletrônicos da residência.",
		id: 2,
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

export default function HomePage (props) {
	function PageBox({item: box}) {
		return (
				<TouchableHighlight
					underlayColor="rgba(255,255,255,0.4)"
					onPress={() => {}}
					style={styles.boxes}
				>
					<View style={styles.boxContent}>
						<View style={styles.firstLine}>
							<Text style={styles.boxIcon}>
								<Icon name={box.icon} size={box.size} color="#FFF" />
							</Text>
							<Text style={styles.boxTitle}>{box.title}</Text>
						</View>
						<Text style={styles.boxDescription}>{box.description}</Text>
					</View>
				</TouchableHighlight>
		);
	}
	
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.boxesContainer}>
				{/* <Weather /> */}
				<FlatList
					data={pagesList}
					renderItem={({ item }) => <PageBox item={item} />}
					keyExtractor={item => item.id}
					style={styles.scrollView}
					numColumns='2'
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 31,
  },
  scrollView: {
		marginHorizontal: 0,
		flex:1,
		flexWrap: "wrap",
	},
	boxesContainer: {
		flex: 1,
		backgroundColor: colors.BACKGROUND_DEFAULT,
	},
  boxes: {
		margin: "2%",
		width: "46%",
		height: 150,
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
