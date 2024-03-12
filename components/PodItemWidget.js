import React, { Component } from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GREY,
  HONEYDEW,
  PEACH,
  PURPLE,
  RED,
  TEAL,
  YELLOW,
} from "../components/NETRTheme";

function colorChanger(color) {
  if (color === "Purple") {
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
    colorChanged = styles.honeydewBC;
  }
}

export default function PodItemWidget({ PodItemTitle, PodItemColor }) {
  colorChanger(PodItemColor);

  return (
    <View style={styles.itemContainer}>
      <Pressable style={colorChanged} onPress={() => null}>
        <Text style={styles.title}>{PodItemTitle}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 16,
    padding: 10,
    height: 150,
  },
  honeydewBC: {
    backgroundColor: HONEYDEW,
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // borderRadius: 16,
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
