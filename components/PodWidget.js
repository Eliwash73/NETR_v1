import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colorChanger } from "./NETRTheme";

export default function PodWidget({ podTitle, podColor, podID }) {
  const router = useRouter();
  const colorChanged = colorChanger(podColor);

  return (
    <View>
      <Pressable
        style={[styles.itemContainer, colorChanged]}
        onPress={() =>
          router.push({
            pathname: "PodInfo",
            params: {
              title: podTitle,
              color: podColor,
              podID: podID,
            },
          })
        }
      >
        <Text style={styles.title}>{podTitle}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#030301",
  },
  itemContainer: {
    backgroundColor: "red",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
