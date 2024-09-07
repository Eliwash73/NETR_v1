import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PodScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
