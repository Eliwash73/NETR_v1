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
        for (const item in podsItems) {
          console.log("items page:", podsItems[item]);
        }
      };
      fetchData();
    }
  }, [isFocused]);

  return (
    <Suspense fallback={<Loading />}>
      <FlatList
        style={{ flex: 1 }}
        data={pods}
        renderItem={({ item }) => (
          <View>
            <PodItemWidget
              podColor={"Honeydew"}
              podID={item.pod_id}
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
    </Suspense>
  );
}

// const styles = StyleSheet.create({
// });

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
