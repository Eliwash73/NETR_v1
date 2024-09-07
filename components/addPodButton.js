import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PURPLE } from "../components/NETRTheme";

const AddPodButton = ({ onPress, buttonText }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 10,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    width: "20%",
    alignItems: "center",
  },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 10,
    // paddingHorizontal: 30,
    borderRadius: 16,
    width: "90%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 32,
  },
});

export default AddPodButton;
