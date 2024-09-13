import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { NETRTheme } from "../../components/NETRTheme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "index") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "items") {
            iconName = focused ? "reorder-four" : "reorder-two";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerTitleAlign: "center",
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Pods",
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: "Items",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
