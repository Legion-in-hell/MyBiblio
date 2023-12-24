import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CollectionScreen = () => {
  const [filters, setFilters] = useState({
    Mangas: false,
    BD: false,
    Romans: false,
    Policier: false,
    Autres: false,
  });

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {Object.keys(filters).map((filter) => (
          <Button
            key={filter}
            title={filter}
            onPress={() => toggleFilter(filter)}
            color={filters[filter] ? "blue" : "grey"}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default CollectionScreen;
