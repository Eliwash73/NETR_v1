import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GREY, TEAL, getColorByValue } from "../components/NETRTheme";

const AddPodItemButton = ({ onPress, color, buttonText }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[styles.button, { backgroundColor: getColorByValue(color) }]}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>
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
    backgroundColor: GREY,
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

export default AddPodItemButton;
