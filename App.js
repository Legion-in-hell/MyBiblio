import React, { useState, useEffect } from "react";
import { NavigationContainer, Text } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import * as Font from "expo-font";
import { ActivityIndicator } from "react-native";

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Alice: require("./assets/fonts/Alice-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
