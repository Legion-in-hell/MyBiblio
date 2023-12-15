import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  navigation,
} from "react-native";
import { GOOGLE_BOOKS_API_KEY, LANGUAGE_RESTRICTION } from "../config.js";

const numColumns = 2;
const size = Dimensions.get("window").width / numColumns;

const BookCard = ({ title, authors, imageUrl, publishedDate }) => (
  <View style={styles.card}>
    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.author}>{authors}</Text>
    {publishedDate && (
      <Text style={styles.date}>Publié le : {publishedDate}</Text>
    )}
  </View>
);

const buildGoogleBooksApiUrl = (
  searchQuery,
  startIndex = 0,
  maxResults = 40
) => {
  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  return `${baseUrl}?q=${encodeURIComponent(
    searchQuery
  )}&printType=books&maxResults=${maxResults}&langRestrict=${LANGUAGE_RESTRICTION}&key=${GOOGLE_BOOKS_API_KEY}`;
};

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const fetchBooks = async () => {
    setLoading(true);
    const apiUrl = buildGoogleBooksApiUrl(searchQuery, startIndex);

    try {
      const response = await fetch(apiUrl);
      const jsonResponse = await response.json();

      if (jsonResponse.items && Array.isArray(jsonResponse.items)) {
        const books = jsonResponse.items.map((item) => {
          const {
            title,
            authors,
            publishedDate,
            description,
            industryIdentifiers,
            pageCount,
            imageLinks,
            dimensions,
            saleInfo,
          } = item.volumeInfo;

          // Trouver l'ISBN
          const isbn = industryIdentifiers?.find(
            (id) => id.type === "ISBN_13"
          )?.identifier;

          // Obtenir les informations de prix
          const price = saleInfo?.listPrice?.amount;
          const currency = saleInfo?.listPrice?.currencyCode;

          return {
            title: title || "Titre inconnu",
            authors: authors ? authors.join(", ") : "Auteur inconnu",
            publishedDate,
            imageUrl:
              imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : null,
            description,
            isbn,
            price,
            currency,
            pageCount,
            dimensions,
          };
        });

        setResults(books);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false);
    }
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
        placeholder="Rechercher des livres..."
      />
      <Button title="Rechercher" onPress={fetchBooks} />
      {isLoading ? (
        <Text>Chargement...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onBookPress(item)}>
              <BookCard
                title={item.title}
                authors={item.authors}
                imageUrl={item.imageUrl}
              />
            </TouchableOpacity>
          )}
          numColumns={numColumns}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    width: size - 20,
    height: size,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "grey",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
});

export default SearchScreen;
