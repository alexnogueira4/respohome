import React, { useState, useEffect } from 'react';
import { NativeModules, ActivityIndicator, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginScreen from "./src/screens/LoginScreen";
import Main from './src/components/main'  
import colors from './src/config/colors'

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const {NavigationBarColor} = NativeModules;
  NavigationBarColor.changeNavigationBarColor(colors.HEXA_BACKGROUND_DEFAULT, false, true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);    
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  if (!user) return <LoginScreen />

  return <Main />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
  