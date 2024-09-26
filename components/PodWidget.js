import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { fetchPodsItems } from "../util/db";
import { colorChanger } from "./NETRTheme";

export default function PodWidget({ podTitle, podColor, podID }) {
  const router = useRouter();
  const colorChanged = colorChanger(podColor);
  const [podItemString, setPodItemString] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          // Fetch pod items for the specified podID
          const items = await fetchPodsItems(podID);
          // Extract item names for display
          const itemTitles = items.map((item) => item.pod_item_name);
          // Create a string representation of the first 4 items or append ellipsis
          const podItemStr =
            itemTitles.length > 4
              ? `${itemTitles.slice(0, 4).join(", ")}...`
              : itemTitles.join(", ");
          setPodItemString(podItemStr);
          // console.log(podItems);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [podID, isFocused]);

  return (
    <View>
      <Pressable
        style={[styles.itemContainer, colorChanged]}
        // Navigate to PodInfo screen with the current pod details when pressed
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
        // Navigate to UpdatePod screen with the current pod details when long-pressed
        // onLongPress={() => {
        //   router.push({
        //     pathname: "UpdatePod",
        //     params: {
        //       title: podTitle,
        //       color: podColor,
        //       podID: podID,
        //     },
        //   });
        // }}
      >
        <Text style={styles.title}>{podTitle}</Text>
        <Text style={styles.items}>{podItemString}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    // color: "#030301",
  },
  items: {
    fontSize: 16,
    // color: "#030301",
  },
  itemContainer: {
    backgroundColor: "red",
    padding: 20,
    // paddingLeft: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
  },
});
