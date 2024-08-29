import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NETRTheme } from "./components/NETRTheme";
import CalendarScreen from "./pages/Calendar";
import HomeScreen from "./pages/Home";
import PodScreen from "./pages/Pod";
import PodInfoScreen from "./pages/PodInfo";
import SettingsScreen from "./pages/Settings";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Pod"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // if (route.name === "Home") {
          //   iconName = focused ? "home" : "home-outline";
          // } else
          if (route.name === "Pod") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Pod" component={PodScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={NETRTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="NETR"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PodInfo" component={PodInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
