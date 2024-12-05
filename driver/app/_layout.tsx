import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "TT-Octosquares-Medium": require("../assets/fonts/TT-Octosquares-Medium.ttf"),
  });

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/document-verification/index" />
        <Stack.Screen name="(routes)/email-verification/index" />
        <Stack.Screen name="(routes)/login/index" />
        <Stack.Screen name="(routes)/ride-details/index" />
        <Stack.Screen name="(routes)/signup/index" />
        <Stack.Screen name="(routes)/verification-phone-number/index" />
      </Stack>
    </ToastProvider>
  );
}
