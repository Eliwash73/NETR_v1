import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import NETRTheme from "./components/NETRTheme";
import CalendarScreen from "./pages/Calendar";
import HomeScreen from "./pages/Home";
import PodScreen from "./pages/Pod";
import SettingsScreen from "./pages/Settings";

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={NETRTheme}>
      {/* backgroundColor= "#F8FFEF" */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Pod") {
              iconName = focused ? "grid" : "grid-outline";
            } else if (route.name === "Calendar") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // tabBarActiveTintColor: "#1B998B",
          // tabBarInactiveTintColor: "#8FZ57F",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pod" component={PodScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
