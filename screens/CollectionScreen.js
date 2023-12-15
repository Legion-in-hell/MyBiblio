import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

const CollectionScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([
    // Add your books here. Each book should be an object with a 'category' and 'image' property.
    // For example: { title: 'Book 1', category: 'Roman', image: 'https://example.com/book1.jpg' }
  ]);

  const categories = ['Roman', 'Manga', 'Policier', 'Bande dessinée', 'Autres']; // Add your categories here

  const booksByCategory = categories.map(category => ({
    category,
    books: books.filter(book => book.category === category),
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={booksByCategory}
        keyExtractor={item => item.category}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard} onPress={() => setSelectedCategory(item.category)}>
            <Text style={styles.categoryTitle}>{item.category}</Text>
            {item.books[0] && <Image style={styles.bookPreview} source={{ uri: item.books[0].image }} />}
            <Text>{item.books.length} books</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCard: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
    
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookPreview: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default CollectionScreen;
