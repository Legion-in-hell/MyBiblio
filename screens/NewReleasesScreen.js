import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import booksData from '../book_data.json';

const NewReleasesScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dejaParus', title: 'Déjà Parus' },
    { key: 'aParaitre', title: 'À Paraître' },
  ]);

  const [dejaParus, setDejaParus] = useState([]);
  const [aParaitre, setAParaitre] = useState([]);

  useEffect(() => {

    const today = new Date();
    const sortedBooks = [...booksData].sort((a, b) => {
      const dateA = new Date(a.date_parution.split('/').reverse().join('-'));
      const dateB = new Date(b.date_parution.split('/').reverse().join('-'));
      return dateB - dateA;
    });

    setDejaParus(sortedBooks.filter(book => new Date(book.date_parution.split('/').reverse().join('-')) <= today));
    setAParaitre(sortedBooks.filter(book => new Date(book.date_parution.split('/').reverse().join('-')) > today));
  }, [navigation]);

  const renderBook = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookContainer} 
      onPress={() => navigation.navigate('BookDetails', { book: item })}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.author}>{item.auteur}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderScene = SceneMap({
    dejaParus: () => (
      <FlatList
        data={dejaParus}
        renderItem={renderBook}
        keyExtractor={item => item.ean}
      />
    ),
    aParaitre: () => (
      <FlatList
        data={aParaitre}
        renderItem={renderBook}
        keyExtractor={item => item.ean}
      />
    ),
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 75,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
  },
  tabBar: {
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tabIndicator: {
    backgroundColor: 'blue',
    height: 3,
    borderRadius: 25,
    width: '40%',
    marginLeft: '5%',
    marginRight: '-5%',
  },
  tabLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  tab: {
    width: 'auto',
  },
});

export default NewReleasesScreen;
