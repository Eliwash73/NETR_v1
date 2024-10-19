import { useIsFocused } from "@react-navigation/native";
import React, { Suspense, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { GREY, HONEYDEW } from "../components/NETRTheme";
import PodItemWidget from "../components/PodItemWidget";
import PodWidget from "../components/PodWidget";
import { fetchAllPodsItems, initPodItemDb } from "../util/db";
export default function ItemScreen() {
  const [pods, setPods] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      initPodItemDb();
      const fetchData = async () => {
        const podsItems = await fetchAllPodsItems();
        setPods(podsItems);
        console.log("items page:");
        for (const item in podsItems) {
          console.log(podsItems[item]);
        }
      };
      fetchData();
    }
  }, [isFocused]);

  return (
    <FlatList
      style={{ flex: 1 }}
      data={pods}
      renderItem={({ item }) => (
        <View>
          <PodItemWidget
            podColor={item.pod_color}
            podID={item.pod_id}
            // podItemColor={item.pod_color}
            podItemName={item.pod_item_name}
            podItemQuantity={item.pod_item_quantity}
            podItemQuantityUnit={item.pod_item_quantity_unit}
            podItemDate={item.pod_item_date}
            podItemCategory={item.pod_category}
          />
        </View>
      )}
      keyExtractor={(item) => String(item.id)}
      bounces={true}
    />
  );
}
