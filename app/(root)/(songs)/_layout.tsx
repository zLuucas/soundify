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
            </Stack>
        </View>
    )
}

export default SongsScreenLayout