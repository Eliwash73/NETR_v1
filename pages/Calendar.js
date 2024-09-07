import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatGrid, SimpleGrid } from "react-native-super-grid";

export default function Example() {
  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "ALIZARIN", code: "#e74c3c" },
    { name: "CLOUDS", code: "#ecf0f1" },
    { name: "CONCRETE", code: "#95a5a6" },
    { name: "ORANGE", code: "#f39c12" },
    { name: "PUMPKIN", code: "#d35400" },
    { name: "POMEGRANATE", code: "#c0392b" },
    { name: "SILVER", code: "#bdc3c7" },
  ]);

  const numColumns = 2;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={10}
        numColumns={numColumns}
        bounces={true}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    marginTop: 10,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 16,
    padding: 50,
    height: 150,
    margin: 5, // Add margin to create spacing
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  columnWrapper: {
    justifyContent: "space-between", // Space items within each row
  },
});
