import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import React from "react";
import { useSetupTrackPlayer } from "@/hooks/useSetupTrackPlayer";
import TrackPlayer, { RepeatMode } from 'react-native-track-player'
import { useLogTrackPlayerState } from "@/hooks/useLogTrackPlayerState";

// Impede a splash screen de esconder automaticamente antes de o app estar pronto.
SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <>
      <RootNavigation />
      <StatusBar style="light" />
    </>
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
    </Stack>
  );
}

export default App;
