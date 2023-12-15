import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button } from 'react-native-paper';
import booksData from '../books_data.json';

const numColumns = 2;
const size = Dimensions.get("window").width / numColumns;

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
        book.auteur.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filteredBooks);
    </View>
  );
};

const styles = StyleSheet.create({
  // ... styles
});

export default SearchScreen;
