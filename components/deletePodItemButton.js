import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RED } from "../components/NETRTheme";

const DeletePodItemButton = ({ onPress, buttonText }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this Pod? \n\n This action cannot be undone?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            onPress();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDelete} style={styles.button}>
        {/* <TouchableOpacity onPress={onPress} style={styles.button}> */}
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
    backgroundColor: RED,
    // paddingVertical: 10,
    // paddingHorizontal: 30,
    borderRadius: 16,
    width: "90%",
    alignItems: "center",
  },

  buttonText: {
    color: "black",
    fontSize: 32,
  },
});

export default DeletePodItemButton;
