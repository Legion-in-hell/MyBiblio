import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

const CustomHeader = ({ title }) => {
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={require("./assets/iconlogo.png")} style={styles.logo} />
        <Text style={[styles.title, { fontFamily: "Alice" }]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginTop: 30,
  },
  logo: {
    marginBottom: 10,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 20,
  },
});

export default CustomHeader;
