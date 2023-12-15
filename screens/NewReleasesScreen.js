import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";

const NewReleasesScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
  const maxResults = 40;

  const buildGoogleBooksApiUrlForNewBooks = (startIndex, selectedCategory) => {
    let searchQuery = selectedCategory
      ? `subject:${selectedCategory}`
      : "subject:";
    const orderBy = "newest";
    return `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      searchQuery
    )}&maxResults=${maxResults}&langRestrict=fr&printType=books&startIndex=${startIndex}&orderBy=${orderBy}`;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setIsFilterMenuVisible(true)}
          style={{ marginRight: 15 }}
        >
          <Image
            source={require("../assets/filter.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      ),
    });
    fetchNewBooks();
  }, [navigation, selectedCategory]);

  const fetchNewBooks = async () => {
    setLoading(true);
    const apiUrl = buildGoogleBooksApiUrlForNewBooks(
      startIndex,
      selectedCategory
    );

    try {
      const response = await fetch(apiUrl);
      const jsonResponse = await response.json();

      if (jsonResponse.items && Array.isArray(jsonResponse.items)) {
        const newBooksMap = new Map(books.map((book) => [book.id, book]));

        jsonResponse.items.forEach((item) => {
          newBooksMap.set(item.id, item);
        });

        setBooks(Array.from(newBooksMap.values()));
        setStartIndex(startIndex + maxResults);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderAuthors = (authors) => {
    if (!authors || authors.length === 0) return "Auteur inconnu";
    return authors.length <= 2
      ? authors.join(", ")
      : `${authors[0]}, ${authors[1]}, et ${authors.length - 2} autres`;
  };

  const onBookPress = (book) => {
    navigation.navigate("BookDetails", { book });
  };

  const renderBook = ({ item }) => {
    const imageAvailable = !!item.volumeInfo.imageLinks?.thumbnail;
    const imageSource = imageAvailable
      ? { uri: item.volumeInfo.imageLinks.thumbnail }
      : require("../assets/AucuneImage.png");

    return (
      <TouchableOpacity
        style={styles.bookContainer}
        onPress={() => onBookPress(item)}
      >
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text style={styles.author}>
          {renderAuthors(item.volumeInfo.authors)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterMenuVisible}
        onRequestClose={() => setIsFilterMenuVisible(false)}
      >
        <View style={styles.modalView}>
          {["Roman", "Policier", "BD", "Manga", "Autre"].map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => {
                setSelectedCategory(category);
                setStartIndex(0);
                setIsFilterMenuVisible(false);
                fetchNewBooks();
              }}
              style={styles.filterMenuItem}
            >
              <Text style={styles.filterMenuText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item, index) => item.id + index}
          numColumns={2}
          onEndReached={fetchNewBooks}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bookContainer: {
    flex: 1,
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterMenuItem: {
    padding: 10,
  },
  filterMenuText: {
    fontSize: 18,
  },
});

export default NewReleasesScreen;
