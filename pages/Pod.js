import React, { Component } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import PodWidget from "../components/PodWidget";
import AddPod from "../components/addPodButton";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Fridge",
    color: "orange",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Pantry",
    color: "grey",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Cabinet",
    color: "purple",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Freezer",
    color: "orange",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Basement freezer",
    color: "grey",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Mini Fridge",
    color: "purple",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Basement Fridge",
    color: "orange",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    title: "Eighth Item",
    color: "grey",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    title: "Ninth Item",
    color: "purple",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    title: "Tenth Item",
    color: "orange",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Tenth Item",
    color: "grey",
  },
];

export default function HomeScreen() {
  const scheme = useColorScheme();
  const handleButtonPress = () => {
    // Define your button press logic here
    alert("Button clicked!");
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <PodWidget title={item.title} color={item.color} />
        )}
        keyExtractor={(item) => item.id}
      />
      <AddPod onPress={handleButtonPress} buttonText="+" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
  },
});
