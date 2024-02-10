import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React, { Component } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";

const PodWidget = ({ title, color }) => {
  // return (
  var colorChanged = styles.defaultBG;
  if (color === "purple") {
    colorChanged = styles.purpleBC;
  } else if (color === "grey") {
    colorChanged = styles.greyBC;
  } else if (color === "orange") {
    colorChanged = styles.orangeBC;
  } else {
    colorChanged = styles.defaultBG;
  }
  return (
    <View style={colorChanged}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
//                  orange     grey        purple
const colors = ["#8F754F", "#6b818c", "#8d6b94"];

const styles = StyleSheet.create({
  defaultBG: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  orangeBC: {
    backgroundColor: colors[0],
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  greyBC: {
    backgroundColor: colors[1],
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  purpleBC: {
    backgroundColor: colors[2],
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    color: "#f8ffef",
  },
});

export default PodWidget;
