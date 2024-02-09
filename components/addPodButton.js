import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddPod = ({ onPress, buttonText }) => {
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
    right: 20,
  },
  button: {
    backgroundColor: "#c83e4d",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 32,
  },
  widget: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    // backgroundColor: colors[0],
  },
});

export default AddPod;