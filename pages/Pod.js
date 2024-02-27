import { useNavigation } from "@react-navigation/native";
import { nanoid } from "nanoid";
import React, { Component, useState } from "react";
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
  useColorScheme,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import "react-native-get-random-values";
import Modal from "react-native-modal";
import PodWidget from "../components/PodWidget";
import AddPod from "../components/addPodButton";
import PodInfoScreen from "./PodInfo";

const HONEYDEW = "#f8ffef";
const PURPLE = "#4C3957";
const TEAL = "#1B998B";
const GREY = "#6B818C";
const RED = "#C83E4D";
const PEACH = "#F4D6CC";
const YELLOW = "#F4N860";

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

const colorSelect = [
  { key: "1", value: "Honeydew", color: HONEYDEW },
  { key: "2", value: "Purple", color: PURPLE },
  { key: "3", value: "Teal", color: TEAL },
  { key: "4", value: "Grey", color: GREY },
  { key: "5", value: "Red", color: RED },
  { key: "6", value: "Peach", color: PEACH },
  { key: "7", value: "Yellow", color: YELLOW },
];

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [podList, setPodList] = useState([]);
  const [podName, setPodName] = useState("");

  const handleModal = () => setModalVisible(() => !isModalVisible);
  const createPod = () => {
    // Create a new pod  with the entered name and selected color
    const newPod = {
      id: nanoid(), //generate unique identifier
      title: podName,
      color: selected,
    };
    // Update the pod list with the new pod
    setPodList([...podList, newPod]);
    // Close the modal
    setModalVisible(false);
    setPodName("");
    console.log(newPod);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={podList}
        renderItem={({ item }) => (
          <PodWidget title={item.title} color={item.color} />
        )}
        keyExtractor={(item) => item.id}
        bounces={true}
      />
      <AddPod onPress={handleModal} buttonText="+" />
      {/* <AddPod onPress={GoToButton} buttonText="Add a Pod" /> */}
      {/* <GoToButton screenName="PodInfo" /> */}

      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Enter Pod name"
              placeholderTextColor={PURPLE}
              onChangeText={(text) => setPodName(text)}
              maxLength={20}
              value={podName}
            />
            <Text style={styles.title}>Color:</Text>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={colorSelect}
              save="value"
              defaultOption={"Teal"}
              search={false}
            />
          </ScrollView>
          <Button title="Create" onPress={createPod} color={TEAL} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "60%",
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: HONEYDEW,
    borderRadius: 16,
    padding: 25,
    // paddingTop: 150,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    color: PURPLE,
  },
  text: {
    fontSize: 18,
    color: PURPLE,
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
  },
});
