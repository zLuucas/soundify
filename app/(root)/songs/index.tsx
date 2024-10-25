import TracksList from '@/components/TracksList'
import { Platform, SafeAreaView, ScrollView, Text, View } from 'react-native'
// import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import library from '@/assets/data/library.json'
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

const SongsScreen = () => {

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <TracksList queueId='songs' tracks={library} />
        </SafeAreaView>
    )
}

export default SongsScreen