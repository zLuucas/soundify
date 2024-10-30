import { StackScreenWithSearchBar } from '@/src/constants/layout'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const ProfileScreenLayout = () => {

    return (
        <View className='flex-1 bg-black'>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: "Profile"
                    }}
                />
                <Stack.Screen
                    name='editProfile'
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: "Edit Profile",
                        presentation: "modal"
                    }}
                />
                <Stack.Screen
                    name='settings'
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: "Settings",
                        headerBackTitleVisible: false
                    }}
                />
            </Stack>
        </View>
    )
}

export default ProfileScreenLayout