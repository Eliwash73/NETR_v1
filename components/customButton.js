import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const CustomButton = ({ onPress, title, color = "black", textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default CustomButton;
