import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from 'expo-font';
import React from "react";
import { useSetupTrackPlayer } from "@/src/hooks/useSetupTrackPlayer";
import TrackPlayer from 'react-native-track-player'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackScreenWithSearchBar } from "@/src/constants/layout";
import { Provider } from 'react-redux'
import { store } from "@/src/store/store";
import { playbackService } from "@/src/constants/playbackServices";
import { useStoreDispatch } from "@/src/store/hooks";
import { getStoredPlaylists, getStoredSettings } from "@/utils";
import { setPlaylists } from "@/src/store/librarySlice";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from "@/src/lib/auth";
import { LogBox } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { updateSettings } from "@/src/store/userSlice";

// Impede a splash screen de esconder automaticamente antes de o app estar pronto.
SplashScreen.preventAutoHideAsync();
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

TrackPlayer.registerPlaybackService(() => playbackService);
LogBox.ignoreLogs(["Clerk: Clerk has"])
LogBox.ignoreLogs(["Failed to setup track player"])

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <RootNavigation />
          <StatusBar style="light" />
        </Provider>
      </BottomSheetModalProvider>
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

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }

  useSetupTrackPlayer({
    onLoad: () => setTrackLoaded(true)
  });

  useEffect(() => {

    const setupStorage = async () => {
      const playlists = await getStoredPlaylists();
      const settings = await getStoredSettings();

      dispatch(updateSettings({ data: settings }));

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
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>

        <Stack screenOptions={{
          contentStyle: { backgroundColor: '#000' },
        }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
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
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default App;
