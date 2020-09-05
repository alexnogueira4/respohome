import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../config/colors";

// We support all the TextInput props
type Props = TextInputProps;

const FormTextInput = React.forwardRef((props, ref) => {
	const { style, ...otherProps } = props;

	return (
		<TextInput
			ref={ref}
			selectionColor={colors.DODGER_BLUE}
			style={[styles.textInput, style]}
			placeholderTextColor={colors.PLACEHODLER_TEXT_COLOR}
			{...otherProps}
		/>
	);
})

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "100%",
    backgroundColor: colors.INPUT_DEFAULT_BACKGROUND,
    marginBottom: 12,
		paddingVertical: 12,
		padding: 12,
    borderRadius: 4,
    borderWidth: 0,
		color: colors.WHITE
  }
});

export default FormTextInput;