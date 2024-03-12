import { useNavigation } from "@react-navigation/native";
import { nanoid } from "nanoid";
import React, { Component, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import "react-native-get-random-values";
import Modal from "react-native-modal";
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

import PodWidget from "../components/PodWidget";
import AddPod from "../components/addPodButton";
import PodInfoScreen from "./PodInfo";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState("Honeydew");
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
          <PodWidget PodTitle={item.title} PodColor={item.color} />
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
    backgroundColor: HONEYDEW,
    borderRadius: 16,
    padding: 25,
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
