import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";

interface Props {
  label: string;
  onPress: () => void;
}


const SubmitButton = (props) => {
	const { label, onPress } = props;
	return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
			<Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.BUTTON_DEFAULT_BACKGROUND,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 0
  },
  text: {
    color: colors.WHITE,
    textAlign: "center",
    height: 20
  }
});

export default SubmitButton;