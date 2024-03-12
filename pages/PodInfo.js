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
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import "react-native-get-random-values";
import { FlatGrid } from "react-native-super-grid";

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
import PodItemWidget from "../components/PodItemWidget";
import PodWidget from "../components/PodWidget";
import AddPod from "../components/addPodButton";

function getColorByValue(value) {
  const selectedColor = colorSelect.find((item) => item.value === value);
  return selectedColor.color;
}

export default function PodInfoScreen({ route }) {
  const handleModal = () => setModalVisible(() => !isModalVisible);
  const [isModalVisible, setModalVisible] = useState(false);
  const [podItemList, setPodItemList] = useState([]);
  const [podItemName, SetPodItemName] = useState("");
  // Create a new pod  with the entered name and selected color
  const { title, color } = route.params;
  const createPodItem = () => {
    // Create a new pod  with the entered name and selected color
    const newPodItem = {
      id: nanoid(), //generate unique identifier
      title: podItemName,
      color: color,
    };
    // Update the pod list with the new pod
    setPodItemList([...podItemList, newPodItem]);
    // Close the modal
    setModalVisible(false);
    SetPodItemName("");
    console.log(newPodItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{JSON.parse(JSON.stringify(title))} Pod</Text>

      <FlatGrid
        itemDimension={130}
        data={podItemList}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          // <View style={styles.itemContainer}>
          //   <Text style={styles.itemName}>{item.title}</Text>
          // </View>
          // <PodItemWidget PodItemTitle={item.title} PodItemColor={item.color} />
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: getColorByValue(color) },
            ]}
          >
            <Pressable onPress={() => null}>
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
          </View>
        )}
      />

      <AddPod onPress={handleModal} buttonText="+" />

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
              onChangeText={(text) => SetPodItemName(text)}
              maxLength={20}
              value={podItemName}
            />
          </ScrollView>
          <Button title="ADD" onPress={createPodItem} color={TEAL} />
        </View>
      </Modal>
    </SafeAreaView>
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
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 16,
    padding: 10,
    height: 150,
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
  // honeydewBC: {
  //   backgroundColor: HONEYDEW,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  // },
  // purpleBC: {
  //   backgroundColor: PURPLE,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  //   color: HONEYDEW,
  // },
  // tealBC: {
  //   backgroundColor: TEAL,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  // },
  // greyBC: {
  //   backgroundColor: GREY,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  // },
  // redBC: {
  //   backgroundColor: RED,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  // },
  // peachBC: {
  //   backgroundColor: PEACH,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  // },
  // yellowBC: {
  //   backgroundColor: YELLOW,
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  //   borderRadius: 16,
  // },
});
