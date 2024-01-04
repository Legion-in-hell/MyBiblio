import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Modal } from "react-native";
import { Button, Text, Switch } from 'react-native-paper';
import { IconButton } from 'react-native-paper';

const AccountScreen = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showRoman, setShowRoman] = useState(true);
  const [showPolicier, setShowPolicier] = useState(true);
  const [showBD, setShowBD] = useState(true);
  const [showMangas, setShowMangas] = useState(true);
  const [showAutre, setShowAutre] = useState(true);

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const closePreferences = () => {
    setShowPreferences(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleRoman = () => {
    setShowRoman(!showRoman);
  };

  const togglePolicier = () => {
    setShowPolicier(!showPolicier);
  };

  const toggleBD = () => {
    setShowBD(!showBD);
  };

  const toggleMangas = () => {
    setShowMangas(!showMangas);
  };

  const toggleAutre = () => {
    setShowAutre(!showAutre);
  };


  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/219/219983.png' }}
          style={styles.profileImage}
        />
        <Text style={[styles.name, darkMode && styles.darkText]}>John Doe</Text>
        <Text style={[styles.email, darkMode && styles.darkText]}>john.doe@example.com</Text>
      </View>
      <View style={styles.buttonSection}>
        <Button icon="cog-outline" mode="outlined" onPress={() => console.log("Settings Pressed")} style={styles.button}>
          Paramètres
        </Button>
        <Button icon="tune" mode="outlined" onPress={openPreferences} style={[styles.button, styles.preferencesButton]}>
          Préférences
        </Button>
        <Button icon="lifebuoy" mode="outlined" onPress={() => console.log("Help & Support Pressed")} style={styles.button}>
          Aide & Support
        </Button>
        <Button icon="logout" mode="contained" color="red" onPress={() => console.log("Logout Pressed")} style={styles.logoutButton}>
          Déconnexion
        </Button>
      </View>
      <Modal visible={showPreferences} onRequestClose={closePreferences}>
        <View style={styles.headermodal}>
        <IconButton
          icon="arrow-left"
          onPress={closePreferences}
          style={styles.backarrow}
        />
        <Text style={styles.preferencesText}>Préférences</Text>
        </View>
        <View style={styles.modalContent}>
        <Text style={styles.optionaffichage}>Général :</Text>
          <View style={styles.modalOptions}>
            <Text style={styles.modalOptionText}>Dark Mode</Text>
            <Switch thumbColor="#0448ba" trackColor={{ false: "#767577", true: "#81b0ff" }} style={styles.switch} value={darkMode} onValueChange={toggleDarkMode} />
          </View>

          <Text style={styles.optionaffichage}>Catégories à afficher :</Text>

          <View style={styles.modalOptions}>
            <Text style={styles.modalOptionText}>Roman</Text>
            <Switch thumbColor="#0448ba" trackColor={{ false: "#767577", true: "#81b0ff" }} style={styles.switch} value={showRoman} onValueChange={toggleRoman} />
          </View>

          <View style={styles.modalOptions}>
            <Text style={styles.modalOptionText}>Policier</Text>
            <Switch thumbColor="#0448ba" trackColor={{ false: "#767577", true: "#81b0ff" }} style={styles.switch} value={showPolicier} onValueChange={togglePolicier} />
          </View>

          <View style={styles.modalOptions}>
            <Text style={styles.modalOptionText}>Bande dessinée</Text>
            <Switch thumbColor="#0448ba" trackColor={{ false: "#767577", true: "#81b0ff" }} style={styles.switch} value={showBD} onValueChange={toggleBD} />
          </View>

          <View style={styles.modalOptions}>
            <Text style={styles.modalOptionText}>Mangas</Text>
            <Switch thumbColor="#0448ba" trackColor={{ false: "#767577", true: "#81b0ff" }} style={styles.switch} value={showMangas} onValueChange={toggleMangas} />
          </View>

          <View style={styles.modalOptions}>
            <Text style={styles.modalOptionText}>Autres</Text>
            <Switch thumbColor="#0448ba" trackColor={{ false: "#767577", true: "#81b0ff" }} style={styles.switch} value={showAutre} onValueChange={toggleAutre} />
          </View>

        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#000",
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
  darkText: {
    color: "#fff",
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
  preferencesButton: {
    backgroundColor: 'transparent',
    color: '#149FFE',
  },
  logoutButton: {
    marginTop: 5,
    backgroundColor: 'red',
  },
  headermodal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalContent: {
    padding: 20,
  },

  switch: {
    position: 'relative',
  },

  modalOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  modalOptionText: {
    fontSize: 18,
  },

  preferencesText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: "30%",
  },

  optionaffichage: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default AccountScreen;