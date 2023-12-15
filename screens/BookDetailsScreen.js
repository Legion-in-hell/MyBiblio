import react from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.authors}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Text>ISBN: {book.isbn}</Text>
      <Text>
        Prix: {book.price ? `${book.price} ${book.currency}` : "Non disponible"}
      </Text>
      <Text>Nombre de pages: {book.pageCount}</Text>
      <Text>
        Dimensions: {book.dimensions?.height} x {book.dimensions?.width} x{" "}
        {book.dimensions?.thickness}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default BookDetailsScreen;
