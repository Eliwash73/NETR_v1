import DateTimePicker from "@react-native-community/datetimepicker";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { Component, useEffect, useState } from "react";
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
import { PodItemCategories, PodItemUnits } from "../components/NETRCategories";
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
import CustomButton from "../components/customButton";
import DeletePodItemButton from "../components/deletePodItemButton";
import {
  addPodItem,
  deletePodItem,
  fetchAllPodsItems,
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [podItemQuantity, setPodItemQuantity] = useState(0);
  const [podItemQuantityUnit, setPodItemQuantityUnit] = useState("Other");
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isFocused) {
      // Initialize the pod item database.
      initPodItemDb();
      // Set the title of the screen based on the provided pod name.
      if (navigation) {
        navigation.setOptions({ title: title });
      }
      // Fetch the pod items for this Pod from the database.
      const fetchData = async () => {
        try {
          // only return items from this Pod
          const items = await fetchPodsItems(numericPodID);
          setPodItems(items);
          // Log pods items for debugging
          console.log(title);
          items.forEach((item) => {
            console.log(item);
          });
        } catch (error) {
          console.error("Error fetching pod items:", error);
        }
      };
      fetchData();
    }
  }, [isFocused, numericPodID, navigation, title]);

  const handleQuantityChange = (text) => {
    // Remove any characters that are not digits or decimal points
    const cleanedText = text.replace(/[^0-9.]/g, "");

    // Ensure there is at most one decimal point
    const decimalCount = (cleanedText.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return; // Do nothing if there's more than one decimal point
    }

    // Set the cleaned and valid text
    setPodItemQuantity(cleanedText);
  };

  const addPodItemtoDB = async () => {
    const quantity = parseFloat(podItemQuantity);
    const newPodItem = {
      pod_id: numericPodID,
      pod_color: color,
      pod_item_name: podItemName.trim(),
      pod_item_quantity: quantity,
      pod_item_quantity_unit: podItemQuantityUnit,
      pod_item_date: selectedDate.toLocaleDateString("fr-CA"),
      pod_item_category: selectedCategory,
    };
    try {
      // Add the new pod to the database.
      await addPodItem(
        newPodItem.pod_id,
        newPodItem.pod_color,
        newPodItem.pod_item_name,
        newPodItem.pod_item_quantity,
        newPodItem.pod_item_quantity_unit,
        newPodItem.pod_item_date,
        newPodItem.pod_item_category
      );

      // Update the local state with the new pod item.
      const items = await fetchPodsItems(numericPodID);
      setPodItems(items);

      fetchAllPodsItems();
    } catch (error) {
      console.log("Error adding pod to database: ", error.message);
    }

    setModalVisible(false);
    setPodItemName("");
    setPodItemQuantity(0);
    setPodItemQuantityUnit("Other");
    setSelectedDate(new Date());
    setSelectedCategory("Other");
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

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setSelectedDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
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
              podItemQuantityUnit={item.pod_item_quantity_unit}
              podItemDate={item.pod_item_date}
              podItemCategory={item.pod_category}
            />
            <DeletePodItemButton onPress={() => deletePodItemFromDB(item.id)} />
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        bounces={true}
        columnWrapperStyle={styles.columnWrapper}
      />

      <AddPodItemButton color={""} onPress={handleModal} buttonText="+" />

      <Modal
        isVisible={isModalVisible}
        // style={styles.modal}
        // avoidKeyboard={true}
        // swipeDirection={["up", "left", "right", "down"]}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <ScrollView>
            <TextInput
              style={styles.nameInput}
              placeholder="Enter an Item Name"
              onChangeText={(text) => setPodItemName(text)}
              maxLength={20}
              value={podItemName}
            />
            <View style={styles.quantityUnitContainer}>
              <TextInput
                style={styles.quantityInput}
                placeholder={"Enter a quantity"}
                keyboardType="numeric"
                onChangeText={handleQuantityChange}
                value={podItemQuantity}
              />
              <SelectList
                setSelected={(val) => setPodItemQuantityUnit(val)}
                data={PodItemUnits}
                save="value"
                // defaultOption={{ key: "11", value: "Other" }}
                placeholder={"Select a Unit"}
                search={true}
              />
            </View>
            {show && (
              <DateTimePicker value={selectedDate} onChange={onChangeDate} />
            )}
            <SelectList
              setSelected={(val) => setSelectedCategory(val)}
              data={PodItemCategories}
              save="value"
              // defaultOption={{ key: "14", value: "Other", abbrv: "other" }}
              placeholder={"Select a Category"}
              search={true}
            />

            <CustomButton
              onPress={showDatePicker}
              title="Enter Best By date"
              // color={HONEYDEW}
              // textStyle={styles.datePickerButton}
            />
            <Text>currently selected: {selectedDate.toDateString()}</Text>
          </ScrollView>
          <View style={{ paddingTop: 10 }}>
            <CustomButton title="ADD" onPress={addPodItemtoDB} color={TEAL} />
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
  quantityUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    // color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  modal: {
    // height: "30%",
    backgroundColor: HONEYDEW,
    borderRadius: 16,
    // margin: 0,
    justifyContent: "flex-end",
    padding: 25,
  },
  quantityInput: {
    flex: 1,
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
    // marginBottom: 20,
    marginRight: 10,
  },
  nameInput: {
    flex: 1,
    borderBottomWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    color: "black",
    borderWidth: 1,
    borderRadius: 4,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
