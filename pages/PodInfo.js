import { useNavigation } from "@react-navigation/native";
// import * as SQLite from "expo-sqlite";
import { nanoid } from "nanoid";
import React, { Component, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { FlatGrid } from "react-native-super-grid";
import {
  GREY,
  HONEYDEW,
  PEACH,
  PURPLE,
  RED,
  TEAL,
  YELLOW,
  colorSelect,
} from "../components/NETRTheme";
import PodItemWidget from "../components/PodItemWidget";
import AddPodButton from "../components/addPodButton";
import PodWidget from "./PodWidget";

function getColorByValue(value) {
  const selectedColor = colorSelect.find((item) => item.value === value);
  return selectedColor.color;
}

export default function PodInfoScreen({ route }) {
  const handleModal = () => setModalVisible(() => !isModalVisible);
  const [isModalVisible, setModalVisible] = useState(false);
  // Create a new pod  with the entered name and selected color
  const { title, color, podID } = route.params;

  //pod items needs to come from the database
  const [podItems, setPodItems] = useState([]);
  const [podItemName, setPodItemName] = useState("");

  const addPodItems = () => {
    let existingPodItems = [...podItems];
    let newPodItem = {
      item_name: podItemName,
      pod_id: podID,

    };
    existingPodItems.push(newPodItem);
    setPodItems(existingPodItems);
    setModalVisible(false);
    setPodItemName("");
    console.log(newPodItem);
  };
  const numColumns = 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{JSON.parse(JSON.stringify(title))} Pod</Text>

      <FlatList
        data={podItems}
        style={styles.gridView}
        numColumns={numColumns}
        spacing={10}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: getColorByValue(color) },
            ]}
          >
            <Pressable onPress={() => null}>
              <Text style={styles.title}>{item.item_name}</Text>
            </Pressable>
          </View>
        )}
        columnWrapperStyle={styles.columnWrapper}
      />

      <AddPodButton onPress={handleModal} buttonText="+" />

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="item name"
              placeholderTextColor={PURPLE}
              onChangeText={(text) => setPodItemName(text)}
              maxLength={20}
              value={podItemName}
            />
          </ScrollView>
          <Button title="ADD" onPress={addPodItems} color={TEAL} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  gridView: {
    marginTop: 10,
    padding: 20,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 16,
    padding: 10,
    height: 150,
    margin: 5, // Add margin to create spacing

    // backgroundColor: GREY,
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
  modal: {
    width: "100%",
    height: "30%",
    backgroundColor: HONEYDEW,
    borderRadius: 16,
    padding: 25,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
  },
  columnWrapper: {
    justifyContent: "space-between", // Space items within each row
  },
});
