import TracksList from '@/components/TracksLists'
import { Platform, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import library from '@/assets/data/library.json'
import { useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';

const SongsScreen = () => {

    const navigation = useNavigation();

    return (
        Platform.OS === 'ios' ?
            <SafeArea className='flex-1 bg-black px-5 pt-2'>
                <TracksList tracks={library} />
            </SafeArea> :
            <SafeAreaView className='flex-1 bg-black px-5 pt-2'>
                <TracksList tracks={library} />
            </SafeAreaView>
    )
}

export default SongsScreen