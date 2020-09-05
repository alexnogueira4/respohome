import React, { useEffect, useState, useRef } from "react";
import FormTextInput from "../components/FormTextInput";
import SubmitButton from "../components/SubmitButton";
import imageLogo from "../assets/images/logo2.png";
import colors from "../config/colors";
import bg from "../assets/images/bg.jpg"
import I18n from '../i18n/locales'
import { Image, StyleSheet, View, KeyboardAvoidingView, ImageBackground, StatusBar } from "react-native";
import auth from '@react-native-firebase/auth';

interface State {
  email: string;
  password: string;
}

export default function LoginScreen (props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const refInput = FormTextInput;

  const getFocusInput = () => refInput.current.focus()
  const handleEmailChange = (email: string) => setEmail(email)
  const handlePasswordChange = (password: string) => setPassword( password )
  const handleLoginPress = () => {
    auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var { errorCode, errorMessage } = error;
      console.log('errorCode', errorCode);
      console.log('errorMessage', errorMessage);
    });
  }
  
  return (
    
    <ImageBackground source={bg} style={styles.image}>
      <KeyboardAvoidingView style={styles.container} behavior={"height"}>
        <StatusBar backgroundColor={colors.LOGIN_STATUS_BAR_COLOR} />
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={email}
            onChangeText={handleEmailChange}
            placeholder={I18n.t('login.emailLabel')}
            onSubmitEditing={()=> getFocusInput()}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
          />
          <FormTextInput
            ref={refInput}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder={I18n.t('login.passwordLabel')}
            secureTextEntry={true}
            onSubmitEditing={handleLoginPress}
            returnKeyType="done"
          />
          <SubmitButton
            label={I18n.t('login.submitLabel')}
            onPress={handleLoginPress}
            />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_LOGIN,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});