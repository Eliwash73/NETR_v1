import * as SQLite from "expo-sqlite";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import {
  Alert,
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
import AddPodButton from "../components/addPodButton";
import DeletePodButton from "../components/deletePodButton";
import { addPod, deletePod, fetchPods, initDb } from "../util/db";
import PodInfoScreen from "./PodInfo";
import PodWidget from "./PodWidget";

export default function HomeScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Honeydew");
  const [pods, setPods] = useState([]);
  const [podName, setPodName] = useState("");

  // initialize and fetch the data from the database
  useEffect(() => {
    initDb();
    const fetchData = async () => {
      const pods = await fetchPods();
      setPods(pods);
      // Uncomment the following line to log all the pods to the console.
      for (const pod in pods) {
        console.log(pods[pod]);
      }
    };
    fetchData();
  }, []);

  const handleModal = () => setModalVisible(!isModalVisible);

  const addPodtoDB = async () => {
    // newPodId is the return of addPod.
    const newPodId = await addPod(podName, selectedColor);
    const newPod = {
      id: newPodId,
      pod_name: podName,
      pod_color: selectedColor,
    };
    try {
      // Add the new pod to the database.
      await addPod(newPod.id, newPod.pod_name, newPod.pod_color);
    } catch (error) {
      console.log("Error adding pod to database: ", error.message);
    }
    // Add the new pod to the state array.
    setPods((existingPods) => [...existingPods, newPod]);
    // Reset the state of the Modal.
    setModalVisible(false);
    // Reset the state of podName.
    setPodName("");
    console.log(newPod);
  };
  const deletePodFromDB = async (delID) => {
    try {
      await deletePod(delID);
      // Remove the deleted pod from the state array.
      setPods((existingPods) => existingPods.filter((pod) => pod.id !== delID));
      // console.log(`Pod deleted successfully`);
    } catch (error) {
      console.log(`Error deleting pod ${delID} from database:`, error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={styles.gridView}
        data={pods}
        renderItem={({ item }) => (
          <View>
            <PodWidget
              PodTitle={item.pod_name}
              PodColor={item.pod_color}
              PodID={item.id}
            />
            <DeletePodButton
              podID={item.id}
              onPress={() => deletePodFromDB(item.id)}
              buttonText="X"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        bounces={true}
      />

      <AddPodButton onPress={handleModal} buttonText="+" />
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
          <Button title="Create" onPress={addPodtoDB} color={TEAL} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    marginTop: 10,
  },
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
