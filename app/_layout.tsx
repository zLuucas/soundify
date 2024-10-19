import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import React from "react";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import TrackPlayer, { RepeatMode } from 'react-native-track-player'
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";
import { Text } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Impede a splash screen de esconder automaticamente antes de o app estar pronto.
SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigation />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const RootNavigation = () => {

  useLogTrackPlayerState();

  const [appReady, setAppReady] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useSetupTrackPlayer({
    onLoad: () => setTrackLoaded(true)
  });

  useEffect(() => {
    const prepareApp = async () => {
      if (loaded && trackLoaded) {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, [loaded, trackLoaded]);

  if (!appReady) {
    return null;
  }


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{
          headerShown: false,
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400
        }}
      />
    </Stack>
  );
}

export default App;
