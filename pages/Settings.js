import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ margin: 20 }}>
      <Text>Settins page</Text>
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
