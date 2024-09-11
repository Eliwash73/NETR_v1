import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GREY, HONEYDEW, PEACH, PURPLE, RED, TEAL, YELLOW } from "./NETRTheme";

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
export default function PodItemWidget({
  podColor,
  podID,
  podItemName,
  podItemQuantity,
  podItemDate,
  podCategory,
}) {
  const router = useRouter();
  colorChanger(podColor);

  return (
    <View>
      <Pressable
        style={colorChanged}
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
  itemContainer: {
    flex: 1,
    // backgroundColor: GREY,
    justifyContent: "flex-end",
    borderRadius: 16,
    padding: 10,
    height: 150,
    margin: 5,
  },
  honeydewBC: {
    backgroundColor: HONEYDEW,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  purpleBC: {
    backgroundColor: PURPLE,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    color: HONEYDEW,
  },
  tealBC: {
    backgroundColor: TEAL,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  greyBC: {
    backgroundColor: GREY,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  redBC: {
    backgroundColor: RED,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  peachBC: {
    backgroundColor: PEACH,
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  yellowBC: {
    backgroundColor: YELLOW,
    // padding: 20,
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
