import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";
import { getColorByValue, HONEYDEW, TEAL } from "../components/NETRTheme";
import { fetchExpirations } from "../util/db";

export default function CalendarScreen() {
  const [dates, setDates] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const isFocused = useIsFocused();

  const todayDate = new Date().toISOString().split("T")[0];

  // initialize and fetch the data from the database
  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        const podItemDates = await fetchExpirations();
        const markedDates = createMarkedDates(podItemDates);
        setDates(markedDates);

        handleDaySelect(todayDate, markedDates);
      };
      fetchData();
    }
  }, [isFocused]);
  const createMarkedDates = (data) => {
    const markedDates = {};

    data.forEach(({ pod_item_name, pod_item_date, pod_color }) => {
      // Check if the date already exists in the dictionary
      if (markedDates[pod_item_date]) {
        // If the date exists, add the item name to the dots array
        markedDates[pod_item_date].dots.push({
          key: pod_item_name,
          color: getColorByValue(pod_color),
        });
      } else {
        // If the date doesn't exist, create a new entry with dots
        markedDates[pod_item_date] = {
          dots: [
            {
              key: pod_item_name,
              color: getColorByValue(pod_color),
              selectedColor: TEAL,
            },
          ],
        };
      }
    });

    return markedDates;
  };

  const handleDaySelect = (date, markedDates) => {
    setSelectedDay(date);

    if (markedDates[date] && markedDates[date].dots) {
      const itemNames = markedDates[date].dots.map((dot) => dot.key);
      setSelectedItems(itemNames);
    } else {
      setSelectedItems([]);
    }
  };

  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDay(date);
    // Check if the pressed day has items
    if (dates[date] && dates[date].dots) {
      // Extract the item names from the dots array
      const itemNames = dates[date].dots.map((dot) => dot.key);
      console.log("%s:", selectedDay, itemNames);
      // If items exist, it extracts their names and displays them.
      setSelectedItems(itemNames);
    } else {
      // If no items exist, it clears the list of displayed items.
      setSelectedItems([]);
    }
  };

  return (
    <View>
      <Calendar
        style={{
          borderRadius: 8,
          margin: 10,
        }}
        theme={{
          selectedDayBackgroundColor: "black",
          calendarBackground: HONEYDEW,
          todayTextColor: TEAL,
          arrowColor: TEAL,
        }}
        onDayPress={handleDayPress}
        monthFormat={"MMMM yyyy"}
        firstDay={0}
        enableSwipeMonths={true}
        markingType={"multi-dot"}
        markedDates={dates}
      />
      <View style={styles.underCalendar}>
        {selectedItems.length > 0 && (
          <View style={styles.expireDay}>
            <Text style={{ margin: 10 }}>Items Expiring Today:</Text>
            {selectedItems.map((item) => (
              <Text key={item} style={styles.expireDayItem}>
                {item}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underCalendar: {
    margin: 10,
  },
  expireDay: {
    marginBottom: 10,
    fontSize: 20,
    borderRadius: 8,
    backgroundColor: HONEYDEW,
    // fontWeight: "bold",
    // textAlign: "center",
  },
  expireDayItem: {
    margin: 5,
    padding: 5,
    fontSize: 16,
    backgroundColor: HONEYDEW,
    // fontWeight: "bold",
    // textAlign: "center",
  },
});
