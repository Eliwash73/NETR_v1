import { useIsFocused } from "@react-navigation/native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import {
  GREY,
  HONEYDEW,
  PURPLE,
  colorChanger,
  colorSelect,
  getColorByValue,
} from "../components/NETRTheme";
import PodItemWidget from "../components/PodItemWidget";
import {
  fetchPodsItems,
  initPodItemDb,
  updatePodColor,
  updatePodName,
} from "../util/db";
export default function UpdatePodScreen() {
  // Create a new pod  with the entered name and selected color
  const { title, color, podID } = useLocalSearchParams();
  // Convert podID to and Int
  const numericPodID = parseInt(podID, 10);
  // console.log({ title, color, numericPodID });
  const [podItems, setPodItems] = useState([]);
  const [podName, setPodName] = useState(title);
  const [podColor, setPodColor] = useState(color);
  const colorChanged = colorChanger(podColor);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const numColumns = 2;

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
        } catch (error) {
          console.error("Error fetching pod items on update page:", error);
        }
      };
      fetchData();
    }
  }, [isFocused, numericPodID, navigation, title]);

  const updateColor = async () => {
    try {
      await updatePodColor(podColor, numericPodID);
    } catch (error) {
      console.error("Error updating pod color:", error);
    }
  };
  const updateName = async () => {
    try {
      await updatePodName(podName.trim(), numericPodID);
    } catch (error) {
      console.error("Error updating pod name:", error);
    }
  };
  const updatePodDetails = () => {
    updateColor();
    updateName();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable style={styles.updateButton} onPress={updatePodDetails}>
              <Text style={styles.updateButtonText}>Update</Text>
            </Pressable>
          ),
        }}
      />

      <FlatList
        style={styles.gridView}
        data={podItems}
        numColumns={numColumns}
        ListHeaderComponent={
          <View style={styles.itemsListHeader}>
            <Text>Update Pod Name</Text>
            <TextInput
              style={styles.updateText}
              onChangeText={(text) => setPodName(text)}
              maxLength={20}
              value={podName}
            />
            <Text style={{ paddingBottom: 15 }}>Update Pod Color</Text>
            <SelectList
              setSelected={(val) => setPodColor(val)}
              data={colorSelect}
              save="value"
              defaultOption={color}
              placeholder={color}
              search={false}
              boxStyles={colorChanged}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: getColorByValue(color) },
            ]}
          >
            <PodItemWidget
              disabled
              podColor={color}
              podID={item.pod_id}
              podItemName={item.pod_item_name}
              podItemQuantity={item.pod_item_quantity}
              podItemQuantityUnit={item.pod_item_quantity_unit}
              podItemDate={item.pod_item_date}
              podItemCategory={item.pod_category}
            />
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        bounces={true}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsListHeader: {
    paddingBottom: 50,
    // paddingTop: 50,
  },
  updateButton: {
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
    backgroundColor: "black",
  },
  updateButtonText: {
    fontSize: 16,
    color: HONEYDEW,
    fontWeight: "bold",
  },
  updateText: {
    height: 40,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderRadius: 5,
    padding: 10,
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
});
