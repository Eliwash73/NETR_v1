import { useLocalSearchParams } from "expo-router";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  colorSelect,
} from "../components/NETRTheme";
import PodItemWidget from "../components/PodItemWidget";
import PodWidget from "../components/PodWidget";
import AddPodItemButton from "../components/addPodItemButton";
import DeletePodItemButton from "../components/deletePodItemButton";
import {
  addPodItem,
  deletePodItem,
  fetchPodsItems,
  initPodItemDb,
} from "../util/db";

function getColorByValue(value) {
  const selectedColor = colorSelect.find((item) => item.value === value);
  // If no color is found, default to a color or log an error
  if (!selectedColor) {
    console.error(`No color found for value: ${value}`);
    return GREY; // Default to GREY or any other fallback color
  }
  return selectedColor.color;
}

export default function PodInfoScreen() {
  const handleModal = () => setModalVisible(() => !isModalVisible);
  const [isModalVisible, setModalVisible] = useState(false);
  // Create a new pod  with the entered name and selected color
  const { title, color, podID } = useLocalSearchParams();
  const numericPodID = parseInt(podID, 10); // Explicitly convert to integer
  // console.log({ title, color, numericPodID });
  //pod items needs to come from the database
  const [podItems, setPodItems] = useState([]);
  const [podItemName, setPodItemName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [podItemQuantity, setPodItemQuantity] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Other");

  useEffect(() => {
    initPodItemDb();
    const fetchData = async () => {
      try {
        const items = await fetchPodsItems(numericPodID);
        // only return items from this Pod
        const thisPodsItems = items.filter(
          (item) => item.pod_id === numericPodID
        );
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
  }, [numericPodID]); // Adding podID as a dependency to re-run if it changes

  const handleQuantityChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setPodItemQuantity(cleanedText);
  };

  const addPodItemtoDB = async () => {
    // use SelectedCategory, selectedDate, selectedQuantity
    const quantity = parseInt(podItemQuantity, 10) || 0; // Default to 0 if NaN
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
    } catch (error) {
      console.log("Error adding pod to database: ", error.message);
    }

    setPodItems((existingPodItems) => [...existingPodItems, newPodItem]);
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
      <Text style={styles.title}>{JSON.parse(JSON.stringify(title))} Pod</Text>

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
    justifyContent: "space-between", // Space items within each row
  },
});
