import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { Component, useEffect, useState } from "react";
import {
  Button,
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
import { PodItemCategories } from "../components/NETRCategories";
import {
  GREY,
  HONEYDEW,
  PEACH,
  PURPLE,
  RED,
  TEAL,
  YELLOW,
  getColorByValue,
} from "../components/NETRTheme";
import PodItemWidget from "../components/PodItemWidget";
import AddPodItemButton from "../components/addPodItemButton";
import DeletePodItemButton from "../components/deletePodItemButton";
import {
  addPodItem,
  deletePodItem,
  fetchPodsItems,
  initPodItemDb,
} from "../util/db";

export default function PodInfoScreen() {
  // Create a new pod  with the entered name and selected color
  const { title, color, podID } = useLocalSearchParams();
  // Convert podID to and Int
  const numericPodID = parseInt(podID, 10);
  // console.log({ title, color, numericPodID });
  const handleModal = () => setModalVisible(() => !isModalVisible);
  const [isModalVisible, setModalVisible] = useState(false);
  const [podItems, setPodItems] = useState([]);
  const [podItemName, setPodItemName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [podItemQuantity, setPodItemQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const navigation = useNavigation();

  useEffect(() => {
    initPodItemDb();
    // Set the title of the screen based on the provided pod name.
    if (navigation) {
      navigation.setOptions({ title: title });
    }
    // Fetch the pod items for this Pod from the database.
    const fetchData = async () => {
      try {
        const items = await fetchPodsItems(numericPodID);
        // only return items from this Pod
        const thisPodsItems = items.filter(
          (item) => item.pod_id === numericPodID
        );
        // Update the state with the fetched pod items.
        setPodItems(thisPodsItems);
        // Log items for debugging
        thisPodsItems.forEach((item) => {
          console.log(item);
        });
      } catch (error) {
        console.error("Error fetching pod items:", error);
      }
    };

    fetchData();
  }, [numericPodID, navigation, title]);

  const handleQuantityChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setPodItemQuantity(cleanedText);
  };

  const addPodItemtoDB = async () => {
    const quantity = parseInt(podItemQuantity, 10) || 0;
    const newPodItem = {
      pod_id: numericPodID,
      item_name: podItemName,
      item_quantity: quantity,
      item_date: selectedDate,
      item_category: selectedCategory,
    };
    try {
      // Add the new pod to the database.
      await addPodItem(
        newPodItem.pod_id,
        newPodItem.item_name,
        newPodItem.item_quantity,
        newPodItem.item_date,
        newPodItem.item_category
      );
      setPodItems((existingPodItems) => [...existingPodItems, newPodItem]);
    } catch (error) {
      console.log("Error adding pod to database: ", error.message);
    }

    setModalVisible(false);
    setPodItemName("");
    setPodItemQuantity("");
    setSelectedDate(null);
    console.log(newPodItem);
  };
  const deletePodItemFromDB = async (delID) => {
    try {
      await deletePodItem(delID);
      setPodItems((existingPodItems) =>
        existingPodItems.filter((item) => item.id !== delID)
      );
    } catch (error) {
      console.log(`Error deleting pod ${delID} from database:`, error.message);
    }
  };
  const numColumns = 2;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.gridView}
        data={podItems}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: getColorByValue(color) },
            ]}
          >
            <PodItemWidget
              podColor={color}
              podID={item.pod_id}
              podItemName={item.pod_item_name}
              podItemQuantity={item.pod_item_quantity}
              podItemDate={item.pod_item_date}
              podItemCategory={item.pod_category}
            />
            <DeletePodItemButton
              podID={item.id}
              onPress={() => deletePodItemFromDB(item.id)}
              buttonText="X"
            />
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        bounces={true}
        columnWrapperStyle={styles.columnWrapper}
      />

      <AddPodItemButton onPress={handleModal} buttonText="+" />

      <Modal
        isVisible={isModalVisible}
        // style={styles.modal}
        // avoidKeyboard={true}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <ScrollView>
            <TextInput
              style={styles.nameInput}
              placeholder="item name"
              placeholderTextColor={PURPLE}
              onChangeText={(text) => setPodItemName(text)}
              maxLength={20}
              value={podItemName}
            />
            <TextInput
              style={styles.quantityInput}
              placeholder={"Enter quantity"}
              keyboardType="numeric"
              placeholderTextColor={PURPLE}
              onChangeText={handleQuantityChange}
              value={podItemQuantity}
            />
            <SelectList
              setSelected={(val) => setSelectedCategory(val)}
              data={PodItemCategories}
              save="value"
              defaultOption={"Other"}
              search={false}
              boxStyles={styles.selectList}
            />
          </ScrollView>
          <View style={{ flex: 1 }}>
            <Button title="ADD" onPress={addPodItemtoDB} color={TEAL} />
          </View>
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
    backgroundColor: GREY,
    justifyContent: "flex-end",
    borderRadius: 16,
    padding: 10,
    height: 150,
    margin: 5,
  },
  selectList: {
    // marginBottom: 50,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    // marginTop: 100,
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  modal: {
    width: "100%",
    height: "50%",
    backgroundColor: HONEYDEW,
    borderRadius: 16,
    padding: 25,
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
