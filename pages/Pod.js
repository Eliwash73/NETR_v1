import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Modal from "react-native-modal";
import {
  GREY,
  HONEYDEW,
  PEACH,
  PURPLE,
  RED,
  TEAL,
  YELLOW,
  colorChanger,
  colorSelect,
} from "../components/NETRTheme";
import PodWidget from "../components/PodWidget";
import AddPodButton from "../components/addPodButton";
import CustomButton from "../components/customButton";
import DeletePodButton from "../components/deletePodButton";
import PodMenu from "../components/podMenuButton";
import {
  addPod,
  deletePod,
  fetchAllPodsItems,
  fetchPods,
  initPodDb,
  initPodItemDb,
  updatePodColor,
} from "../util/db";

export default function PodScreen() {
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Honeydew");
  const [pods, setPods] = useState([]);
  const colorChanged = colorChanger(selectedColor);
  const [delID, setDelID] = useState(0);
  // const [podOrder, setPodOrder] = useState(0);
  const [podName, setPodName] = useState("");
  const isFocused = useIsFocused();
  // initialize and fetch the data from the database
  useEffect(() => {
    if (isFocused) {
      initPodDb();
      const fetchData = async () => {
        const pods = await fetchPods();
        setPods(pods);
        // Uncomment the following line to log all the pods to the console.
        for (const pod in pods) {
          console.log(pods[pod]);
        }
      };
      fetchData();
    }
  }, [isFocused]);

  const handleModal = () => setModalVisible(!isModalVisible);
  const handleMenuModal = () => setMenuVisible(!isMenuVisible);

  const addPodtoDB = async () => {
    try {
      // newPodId is the return of addPod.
      const newPodId = await addPod(podName.trim(), selectedColor);

      // Create the new pod object using the ID, podName, and selectedColor
      const newPod = {
        id: newPodId,
        pod_name: podName.trim(),
        pod_color: selectedColor,
        // pod_order: podOrder,
      };

      // Add the new pod to the state array.
      setPods((existingPods) => [...existingPods, newPod]);
      // setPodOrder(newPod.pod_order);

      // Reset the state of the Modal.
      setModalVisible(false);
      // Reset the state of podName.
      setPodName("");
      console.log(newPod);
    } catch (error) {
      console.log("Error adding pod to database: ", error.message);
    }
  };
  const deletePodFromDB = async (delID) => {
    try {
      await deletePod(delID);
      // Remove the deleted pod from the state array.
      setPods((existingPods) => existingPods.filter((pod) => pod.id !== delID));

      fetchPods(); //
      fetchAllPodsItems();
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
        ListHeaderComponent={
          <View style={{ paddingBottom: 50 }}>
            <AddPodButton onPress={handleModal} buttonText={"Add a new Pod"} />
          </View>
        }
        renderItem={({ item }) => (
          <View>
            <PodWidget
              podID={item.id}
              podTitle={item.pod_name}
              podColor={item.pod_color}
            />
            <PodMenu onPress={handleMenuModal} />

            <Modal
              isVisible={isMenuVisible}
              onBackButtonPress={() => setMenuVisible(false)}
              onBackdropPress={() => setMenuVisible(false)}
              onSwipeComplete={() => setMenuVisible(false)}
            >
              <View style={styles.menuModal}>
                <ScrollView>
                  <Text style={styles.title}>Pod Settings</Text>
                  {/* <Text style={styles.subtitle}>
                    This action cannot be undone.
                  </Text> */}
                  {/* <View style={styles.editButton}> */}
                  <Pressable
                    style={styles.editButton}
                    onPress={() =>
                      router.push({
                        pathname: "UpdatePod",
                        params: {
                          title: item.pod_name,
                          color: item.pod_color,
                          podID: item.id,
                        },
                      })
                    }
                  >
                    <Text style={styles.text}>Edit</Text>
                  </Pressable>
                  {/* </View> */}
                  <DeletePodButton
                    buttonText={"Delete"}
                    onPress={() => deletePodFromDB(item.id)}
                  />
                </ScrollView>
              </View>
            </Modal>
          </View>
        )}
        keyExtractor={(item) => item.id}
        bounces={true}
      />

      <Modal
        isVisible={isModalVisible}
        avoidKeyboard={true}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.addPodModal}>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Enter a Pod Name"
              onChangeText={(text) => setPodName(text)}
              maxLength={20}
              value={podName}
            />
            {/* <Text style={styles.title}>Color:</Text> */}
            <View style={styles.addPodModalColor}>
              <SelectList
                setSelected={(val) => setSelectedColor(val)}
                data={colorSelect}
                save="value"
                defaultOption={"Teal"}
                search={false}
                placeholder="Select a Color"
                boxStyles={colorChanged}
              />
            </View>
          </ScrollView>
          <View style={{ paddingTop: 30 }}>
            <CustomButton title="Create" onPress={addPodtoDB} color={TEAL} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  editButton: {
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: GREY,
    alignItems: "center",
  },
  podContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Adjust as needed
  },
  menuModal: {
    width: "100%",
    backgroundColor: HONEYDEW,
    borderRadius: 16,
    padding: 25,
  },
  addPodModal: {
    width: "100%",
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
    color: "black",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    padding: 10,
  },
  addPodModalColor: {
    marginTop: 20,
  },
});
