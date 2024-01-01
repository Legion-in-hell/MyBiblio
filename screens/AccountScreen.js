import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { Button, Text } from 'react-native-paper';

const AccountScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>
      <View style={styles.buttonSection}>
        <Button icon="cog-outline" mode="outlined" onPress={() => console.log("Settings Pressed")} style={styles.button}>
          Settings
        </Button>
        <Button icon="tune" mode="outlined" onPress={() => console.log("Preferences Pressed")} style={styles.button}>
          Preferences
        </Button>
        <Button icon="lifebuoy" mode="outlined" color="#149FFE" onPress={() => console.log("Help & Support Pressed")} style={styles.button}>
          Help & Support
        </Button>
        <Button icon="logout" mode="contained" color="red" onPress={() => console.log("Logout Pressed")} style={styles.logoutButton}>
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  buttonSection: {
    marginTop: '70%',
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    marginVertical: 5,
    color: 'red',
  },
  logoutButton: {
    marginTop: 5,
    backgroundColor: 'red',
  },
});

export default AccountScreen;
