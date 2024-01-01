import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Searchbar } from 'react-native-paper';
import booksData from '../book_data.json';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchBooks = () => {
    const filteredBooks = booksData.filter(
      (book) =>
        book.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.auteur.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredBooks);
  };

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

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Rechercher"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Button
        mode="contained"
        onPress={searchBooks}
        style={styles.button}
      >
        Rechercher
      </Button>
      <FlatList
        data={results}
        renderItem={renderBook}
        keyExtractor={item => item.ean}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    marginBottom: 10,
  },
  searchButton: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
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
  button: {
    marginBottom: 10,
    backgroundColor: 'rgba(0, 150, 255, 0.9)',
  },
});

export default SearchScreen;
