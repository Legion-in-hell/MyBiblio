import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomHeader from "./CustomHeader";
import AccountScreen from "./screens/AccountScreen";
import CollectionScreen from "./screens/CollectionScreen";
import NewReleasesScreen from "./screens/NewReleasesScreen";
import SearchScreen from "./screens/SearchScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const NouveautéStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        style={styles.navBottom}
        name="NouveautéScreen"
        component={NewReleasesScreen}
        options={{
          header: () => <CustomHeader title="My Biblio" />,
        }}
      />
    <Stack.Screen
      name="BookDetails"
      component={BookDetailsScreen}
      options={({ route }) => ({ title: route.params.book.titre })}
    />
    </Stack.Navigator>
  );
};
const CollectionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        style={styles.navBottom}
        name="CollectionScreen"
        component={CollectionScreen}
        options={{
          header: () => <CustomHeader title="My Biblio" />,
        }}
      />
    </Stack.Navigator>
  );
};

const RechercheStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        style={styles.navBottom}
        name="RechercheScreen"
        component={SearchScreen}
        options={{
          header: () => <CustomHeader title="My Biblio" />,
        }}
      />
      <Stack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={({ route }) => ({ title: route.params.book.titre })}
      />
    </Stack.Navigator>
  );
};

const CompteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        style={styles.navBottom}
        name="CompteScreen"
        component={AccountScreen}
        options={{
          header: () => <CustomHeader title="My Biblio" />,
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Nouveauté":
              iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
              break;
            case "Collection":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Recherche":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Compte":
              iconName = focused ? "person" : "person-outline";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Nouveauté" component={NouveautéStack} />
      <Tab.Screen name="Collection" component={CollectionStack} />
      <Tab.Screen name="Recherche" component={RechercheStack} />
      <Tab.Screen name="Compte" component={CompteStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({

  navBottom: {
    marginTop: 30,
  },

})

export default AppNavigator;
