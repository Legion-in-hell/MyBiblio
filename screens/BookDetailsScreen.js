import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";

const BookDetailsScreen = ({ route }) => {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.image_url }} style={styles.image} />
      <View style={styles.btnContainer}>
        <Button mode="contained" style={styles.btn1}>+ collection</Button>
        <Button mode="contained" style={styles.btn2}>+ liste d'achat</Button>
      </View>
      <View style={styles.bottomDetail}>
        <Text style={styles.title}>{book.titre}</Text>
        <Text style={styles.author}>{book.auteur}</Text>
        <Text style={styles.description}>{book.description}</Text>
        <Text><Text style={{fontWeight: 'bold'}}>Prix:</Text> {book.prix}</Text>
        <Text><Text style={{fontWeight: 'bold'}}>EAN:</Text> {book.isbn}</Text>
        <Text>
          <Text style={{fontWeight: 'bold'}}>Date de parution: </Text>{book.date_parution}
        </Text>
        <Text><Text style={{fontWeight: 'bold'}}>Nombre de pages:</Text> {book.nb_pages}</Text>
        <Text><Text style={{fontWeight: 'bold'}}>Dimensions: </Text>{book.dimensions}</Text>
        <Text><Text style={{fontWeight: 'bold'}}>Poids:</Text> {book.poids}</Text>

        <View style={{ marginBottom: 40 }} />
      </View>
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
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  author: {
    fontSize: 15,
    marginBottom: 10,
    color: "grey",
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn1: {
    backgroundColor: "red",
    width: "48%",
  },
  btn2: {
    backgroundColor: "blue",
    width: "48%",
  },
  ean: {
    fontSize: 16,
    marginVertical: 10,
  },
  nb_pages: {
    fontSize: 16,
    marginVertical: 10,
  },
  dimensions: {
    fontSize: 16,
    marginVertical: 10,
  },
  date_parution: {
    fontSize: 16,
    marginVertical: 10,
  },
  bottomDetail: {
    marginLeft: 10,
  },
});

export default BookDetailsScreen;
