import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import React from "react";
import { useSetupTrackPlayer } from "@/src/hooks/useSetupTrackPlayer";
import TrackPlayer, { RepeatMode } from 'react-native-track-player'
import { useLogTrackPlayerState } from "@/src/hooks/useLogTrackPlayerState";
import { Platform, Text } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackScreenWithSearchBar } from "@/src/constants/layout";
import { Provider } from 'react-redux'
import { store } from "@/src/store/store";
import themeColors from "@/src/constants/colors";
import { playbackService } from "@/src/constants/playbackServices";
import { useStoreDispatch } from "@/src/store/hooks";
import { getStoredPlaylists } from "@/utils";
import { setPlaylists } from "@/src/store/librarySlice";

// Impede a splash screen de esconder automaticamente antes de o app estar pronto.
SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => playbackService);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootNavigation />
        <StatusBar style="light" />
      </Provider>
    </GestureHandlerRootView>
  );
}

const RootNavigation = () => {

  const [appReady, setAppReady] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false);

  const dispatch = useStoreDispatch();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useSetupTrackPlayer({
    onLoad: () => setTrackLoaded(true)
  });

  useEffect(() => {

    const setupStorage = async () => {
      const playlists = await getStoredPlaylists();

      if (playlists.length > 0) {
        dispatch(setPlaylists(playlists));
      }
    }

    setupStorage();

  }, []);

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
        name="[player]"
        options={{
          headerShown: false,
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400
        }}
      />
      <Stack.Screen
        name="(modals)/addToPlaylist"
        options={{
          presentation: 'modal',
          headerTitle: 'Add to Playlist',
          ...StackScreenWithSearchBar
        }}
      />
      <Stack.Screen
        name="(modals)/createPlaylist"
        options={{
          presentation: 'modal',
          headerShown: false,
          headerTitle: 'New Playlist',
          ...StackScreenWithSearchBar
        }}
      />
      <Stack.Screen
        name="(modals)/editPlaylist"
        options={{
          presentation: 'modal',
          headerShown: false,
          headerTitle: 'Edit Playlist',
          ...StackScreenWithSearchBar
        }}
      />
    </Stack>
  );
}

export default App;
