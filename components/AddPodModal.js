import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Modal } from "react-native-modal";
import { HONEYDEW, PURPLE, TEAL } from "./NETRTheme";
import CustomButton from "./customButton";

export default function AddPodModal({
  isModalVisible,
  onBackButtonPress,
  onBackdropPress,
  onChangeText,
  value,
  setSelected,
  colorSelect,
  addPod,
}) {
  return (
    <Modal
      isVisible={isModalVisible}
      avoidKeyboard={true}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
    >
      <View style={styles.modal}>
        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Enter Pod name"
            onChangeText={onChangeText}
            maxLength={20}
            value={value}
          />
          <Text style={styles.title}>Color:</Text>
          <SelectList
            setSelected={setSelected}
            data={colorSelect}
            save="value"
            defaultOption={"Teal"}
            search={false}
          />
        </ScrollView>
        <CustomButton title="Create Pod" onPress={addPod} color={TEAL} />
      </View>
    </Modal>
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
  input: {
    borderWidth: 1,
    height: 40,
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 24,
    color: PURPLE,
  },
});

{
  /* <AddPodModal
        isModalVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onChangeText={(text) => setPodName(text)}
        value={podName}
        setSelected={(val) => setSelectedColor(val)}
        colorSelect={colorSelect}
        addPod={addPodtoDB}
      /> */
}
