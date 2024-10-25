import { StackScreenWithSearchBar } from '@/src/constants/layout'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const SongsScreenLayout = () => {
    return (
        <View className='flex-1 bg-black'>
            <Stack>
                <Stack.Screen name='index' options={{
                    ...StackScreenWithSearchBar,
                    headerTitle: "Songs"
                }} />
                <Stack.Screen name="artist/[name]" options={{
                    ...StackScreenWithSearchBar,
                    title: 'Artist Details',
                    headerBackTitleVisible: false
                }} />
            </Stack>
        </View>
    )
}

export default SongsScreenLayout