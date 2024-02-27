import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HONEYDEW = "#f8ffef";
const PURPLE = "#713E5A";
const TEAL = "#1B998B";
const GREY = "#6B818C";
const RED = "#C83E4D";
const PEACH = "#F4D6CC";
const YELLOW = "#E3B505";
// const EGGPLANT = "#713E5A";

function colorChanger(color) {
  if (color === "Honeydew") {
    colorChanged = styles.honeydewBC;
  } else if (color === "Purple") {
    colorChanged = styles.purpleBC;
  } else if (color === "Teal") {
    colorChanged = styles.tealBC;
  } else if (color === "Grey") {
    colorChanged = styles.greyBC;
  } else if (color === "Red") {
    colorChanged = styles.redBC;
  } else if (color === "Peach") {
    colorChanged = styles.peachBC;
  } else if (color === "Yellow") {
    colorChanged = styles.yellowBC;
  } else {
    colorChanged = styles.defaultBG;
  }
}

export default function PodWidget({ title, color }) {
  colorChanger(color);
  return (
    <View style={colorChanged}>
      <Text style={styles.title}>{title}</Text>
      <GoToButton screenName={"PodInfo"} />
    </View>
  );
}

function GoToButton({ screenName }) {
  const navigation = useNavigation();
  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

const styles = StyleSheet.create({
  defaultBG: {
    backgroundColor: "#f8ffef",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  honeydewBC: {
    backgroundColor: HONEYDEW,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  purpleBC: {
    backgroundColor: PURPLE,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    color: HONEYDEW,
  },
  tealBC: {
    backgroundColor: TEAL,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  greyBC: {
    backgroundColor: GREY,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  redBC: {
    backgroundColor: RED,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  peachBC: {
    backgroundColor: PEACH,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  yellowBC: {
    backgroundColor: YELLOW,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    color: "#030301",
    paddingBottom: 10,
  },
});
