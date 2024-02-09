import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import CalendarScreen from "./pages/Calendar";
import HomeScreen from "./pages/Home";
import PodScreen from "./pages/Pod";

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
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
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: scheme === "dark" ? "#6B818C" : "#32373B",
          tabBarInActiveTintColor: scheme === "dark" ? "#6B818C" : "#32373B",
          // tabBarInactiveTintColor: "#32373B",
          tabBarActiveBackgroundColor:
            scheme === "dark" ? "#F4D6CC" : "#FFFFFF",
          tabBarInactiveBackgroundColor:
            scheme === "dark" ? "#F4D6CC" : "#FFFFFFF",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pod" component={PodScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
