import { Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} />;
      </SafeScreen>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaProvider>
  );
}
