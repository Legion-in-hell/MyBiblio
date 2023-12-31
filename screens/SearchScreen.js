import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button } from 'react-native-paper';
import booksData from '../book_data.json';

const numColumns = 2;

const BookCard = ({ title, authors, imageUrl, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.author}>{authors}</Text>
  </TouchableOpacity>
);

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

  const onBookPress = (book) => {
    navigation.navigate("BookDetails", { book });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Rechercher des livres...."
        placeholderTextColor="#666"
      />
      <Button 
        mode="contained"
        onPress={searchBooks}
        style={styles.searchButton}
      >
        Rechercher
      </Button>
      <FlatList
        data={results}
        keyExtractor={(item, index) => item.ean + index.toString()}
        renderItem={({ item }) => (
          <BookCard
            title={item.titre}
            authors={item.auteur}
            imageUrl={item.image_url}
            onPress={() => onBookPress(item)}
          />
        )}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... styles...
});

export default SearchScreen;
