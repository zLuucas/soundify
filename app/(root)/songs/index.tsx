import TracksList from '@/components/TracksList'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import library from '@/assets/data/library.json'

const SongsScreen = () => {

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <TracksList queueId='songs' tracks={library} />
        </SafeAreaView>
    )
}

export default SongsScreen