import * as SQLite from "expo-sqlite";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
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
import AddPod from "../components/addPodButton";
import PodInfoScreen from "./PodInfo";
import PodWidget from "./PodWidget";

// const db = await SQLite.openDatabaseAsync("pod.db");
// await db.execAsync(`
// PRAGMA journal_mode = WAL;
// CREATE TABLE IF NOT EXISTS pods (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   pod_name TEXT,
//   pod_color TEXT)
// `);

// // const delete = await db.runAsync('INSERT INTO pods (pod_name, pod_color) VALUES (?,?)')

// db.transaction((tx) => {
//   tx.executeSql(
//     "SELECT * FROM pods",
//     null,
//     (txObj, resultSet) => setPods(resultSet.rows._array),
//     (txObj, error) => console.log(error)
//   );
// });

export default function HomeScreen() {
  // const [selected, setSelected] = useState("Honeydew");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Honeydew");
  const handleModal = () => setModalVisible(() => !isModalVisible);
  // const [podList, setPodList] = useState([]);
  //db

  const [pods, setPods] = useState([]);
  const [podName, setPodName] = useState("");

  const addPod = () => {
    // db.execAsync
    let existingPods = [...pods];
    let newPod = {
      // id: resultSet.insertId,
      id: nanoid(),
      pod_title: podName,
      pod_color: selectedColor,
    };
    existingPods.push(newPod);
    setPods(existingPods);
    setModalVisible(false);
    setPodName("");
    console.log(newPod);
  };

  const deletePod = () => {
    let existingPods = [...pods];
    let newPod = {
      // id: resultSet.insertId,
      // id, title, and color gets passed into PodWidgets constructor
      id: nanoid(),
      pod_title: podName,
      pod_color: selectedColor,
    };
    existingPods.push(newPod);
    setPods(existingPods);
    setModalVisible(false);
    setPodName("");
    console.log(newPod);
  };

  // const createPod = () => {
  //   // Create a new pod  with the entered name and selectedColor color
  //   const newPod = {
  //     id: nanoid(), //generate unique identifier
  //     title: podName,
  //     color: selectedColor,
  //   };
  //   // Update the pod list with the new pod
  //   setPodList([...podList, newPod]);
  //   // Close the modal
  //   setModalVisible(false);
  //   setPodName("");
  //   console.log(newPod);
  // };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pods}
        renderItem={({ item }) => (
          <PodWidget
            PodTitle={item.pod_title}
            PodColor={item.pod_color}
            PodID={item.id}
          />
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
              setSelected={(val) => setSelectedColor(val)}
              data={colorSelect}
              save="value"
              defaultOption={"Teal"}
              search={false}
            />
          </ScrollView>
          <Button title="Create" onPress={addPod} color={TEAL} />
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
