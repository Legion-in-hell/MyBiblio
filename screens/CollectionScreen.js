import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import book_data from '../book_data.json';

const CollectionScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isScannerOpen, setScannerOpen] = useState(false);

  const categories = ['Roman', 'Manga', 'Policier', 'Bande dessinée', 'Autres'];


  const totalBooks = books.length;

  const handleScanBook = () => {
    // Logic for scanning a book (work in progress)
  };

  const handleShareCollection = () => {
    // Logic for sharing the collection (work in progress)
  };

  const onBarCodeScanned = ({ type, data }) => {
    setScannerOpen(false);
    const book = book_data.find(book => book.ean === data);
    if (book) {
      setBooks(prevBooks => [...prevBooks, book]);
    } else {
      alert('Book not found');
    }
  };

  const booksByCategory = categories.map(category => ({
    category,
    books: [...books.filter(book => book.category === category), ...wishlist.filter(book => book.category === category)],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.totalBooks}>{totalBooks} livre(s) dans la collection</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleScanBook}>
          <Ionicons name="scan-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleShareCollection}>
          <Ionicons name="share-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Partager</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={booksByCategory}
        keyExtractor={item => item.category}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard} onPress={() => setSelectedCategory(item.category)}>
            <Text style={styles.categoryTitle}>{item.books.length} {item.category} dans la collection</Text>
            {item.books[0] && <Image style={styles.bookPreview} source={{ uri: item.books[0].image }} />}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  totalBooks: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 20,
  },
  categoryCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookPreview: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: 'space-between',
  },
  button1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  button2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default CollectionScreen;
