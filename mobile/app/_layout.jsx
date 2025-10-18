import { Stack, useRouter, useSegments } from "expo-router";
import SafeScreen from "@/components/SafeScreen.jsx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore.js";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //handle navigation based on auth state
  useEffect(() => {
    if(isCheckingAuth) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    
    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments, router, isCheckingAuth]);

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar barStyle="dark-content" />
    </SafeAreaProvider>
  );
}
