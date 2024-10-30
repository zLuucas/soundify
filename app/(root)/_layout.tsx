import themeColors from '@/src/constants/colors';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import React from 'react';
import FloatingPlayer from '@/components/FloatingPlayer';

export default function TabLayout() {
  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: themeColors.primary[700],
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500'
          },
          tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: Platform.OS === 'ios' ? 20 : 0,
            borderTopRightRadius: Platform.OS === 'ios' ? 20 : 0,
            borderTopWidth: 0,
            paddingTop: Platform.OS === 'ios' ? 8 : 8,
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            height: Platform.OS === 'ios' ? "8.2%" : 60,
            backgroundColor: Platform.OS === 'ios' ? "transparent" : '#0d0d0d'
            // backgroundColor: "#1A1A1A"
          },
          tabBarBackground: () => (
            Platform.OS === 'ios' ? <BlurView
              intensity={80}
              tint='dark'
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: "hidden",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: Platform.OS === 'ios' ? "transparent" : "#1A1A1A"
              }}
            /> : null
          )
        }}>
        <Tabs.Screen name='home' options={{
          title: "Home",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' size={30} color={color} />
        }} />
        <Tabs.Screen name='songs' options={{
          title: "Songs",
          tabBarIcon: ({ color }) => <AntDesign name='search1' size={24} color={color} />
        }} />
        <Tabs.Screen name='my_music' options={{
          title: "My Music",
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name='playlist-music-outline' size={30} color={color} />
        }} />
        <Tabs.Screen name='profile' options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <AntDesign name='user' size={24} color={color} />
        }} />
      </Tabs >

      <FloatingPlayer />
    </>
  );
}
