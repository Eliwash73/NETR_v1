import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React, { Component } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
// both widgets are in the same file for now because PodWidget file isnt working
import PodWidget from "../components/PodWidget";
import { default as AddPod } from "../components/addPodButton";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    color: "orange",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    color: "grey",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    color: "purple",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    title: "Fourth Item",
    color: "orange",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    title: "Fifth Item",
    color: "grey",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    title: "Sixth Item",
    color: "purple",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    title: "Seventh Item",
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

const PodData = [{ id: "bd7acbea-c1b1-46c2-a", title: "Fridge" }];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

// const PodWidget = ({ title }) => (
//   //   return (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
//   //   );
// );

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
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
  },
});
