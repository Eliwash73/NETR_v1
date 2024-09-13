import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { GREY, HONEYDEW } from "../components/NETRTheme";
import PodItemWidget from "../components/PodItemWidget";
import PodWidget from "../components/PodWidget";
import { fetchAllPodsItems } from "../util/db";
export default function ItemScreen() {
  const [pods, setPods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const podsItems = await fetchAllPodsItems();
      setPods(podsItems);
    };
    fetchData();
  }, []);
  return (
    <FlatList
      style={{ flex: 1 }}
      data={pods}
      ListHeaderComponent={
        <View style={{ paddingBottom: 10 }}>
          {/* Add any non-list content here, like PodWidgets */}
          <PodWidget podColor={"Red"} />
          <PodWidget />
        </View>
      }
      renderItem={({ item }) => (
        <View>
          <PodItemWidget
            podColor={"Honeydew"}
            podID={item.pod_id}
            podItemName={item.pod_item_name}
            podItemQuantity={item.pod_item_quantity}
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

const styles = StyleSheet.create({
  itemContainer: {
    // flex: 1,
    // backgroundColor: GREY,
    // justifyContent: "flex-end",
    // borderRadius: 16,
    // padding: 20,
    // height: 100,
    // margin: 5,
  },
});
