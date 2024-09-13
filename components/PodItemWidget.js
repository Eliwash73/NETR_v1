import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colorChanger } from "./NETRTheme";

export default function PodItemWidget({
  podColor,
  podID,
  podItemName,
  podItemQuantity,
  podItemDate,
  podCategory,
}) {
  const router = useRouter();
  const colorChanged = colorChanger(podColor);

  return (
    <View>
      <Pressable
        style={[styles.itemContainer, colorChanged]}
        onPress={() =>
          router.push({
            pathname: "PodItemInfo",
            params: {
              podID: podID,
              item_title: podItemName,
              item_quantity: podItemQuantity,
              item_date: podItemDate,
              item_category: podCategory,
            },
          })
        }
      >
        <Text style={styles.title}>{podItemName}</Text>
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
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 6,
    borderRadius: 16,
  },
});
