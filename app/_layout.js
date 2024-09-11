import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router/stack";
import { NETRTheme } from "../components/NETRTheme";

export default function Layout() {
  return (
    <ThemeProvider value={NETRTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
