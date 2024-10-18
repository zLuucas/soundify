import TracksList from '@/components/TracksLists'
import SearchBar from '@/components/UI/SearchBar';
import { useNavigationSearch } from '@/src/hooks/useNavigationSearch'
import { Platform, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import library from '@/assets/data/library.json'

const SongsScreen = () => {
    return (
        Platform.OS === 'ios' ?
            <SafeArea className='flex-1 bg-black px-5 pt-2'>
                <TracksList tracks={library} />
            </SafeArea> :
            <SafeAreaView className='flex-1 bg-black px-5 pt-2'>
                <TracksList tracks={library} />
            </SafeAreaView>
        // <SafeAreaView className='flex-1 bg-black px-5 pb-16'>
        //     {/* <ScrollView contentInsetAdjustmentBehavior='automatic' > */}
        //     {/* <View className='flex-1'> */}
        //     <SearchBar label='Test' containerStyle='' icon="search" />
        //     <TracksList />
        //     {/* </View> */}
        //     {/* </ScrollView> */}
        // </SafeAreaView>

    )
}

export default SongsScreen