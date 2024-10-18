import { FlatList, FlatListProps, ScrollView, Text, TextInput, View } from 'react-native'
import TrackListItem from './TrackListItem'
import SearchBar from './UI/SearchBar'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useMemo, useRef, useState } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import themeColors from '@/src/constants/colors'

type TracksListProps = Partial<FlatListProps<unknown>> & {
    tracks: Track[]
}

const ItemDivider = () => {
    return (
        <View className='my-2 ml-16 border border-secondary-700 opacity-30' />
    )
}

const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQuery = () => {
        console.log('searching')
    }

    const filteredSongs: Track[] = useMemo(() => {
        if (searchQuery === '') return tracks;

        return tracks.filter((track) => {
            return track.title?.toLowerCase().includes(searchQuery.toLowerCase()) || track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [searchQuery]);

    const handleOnTrackSelect = async (track: Track) => {
        await TrackPlayer.load(track);
        await TrackPlayer.play();
    };

    const EmptyListRender = () => {
        return (
            <View className='mt-60 flex-col items-center'>
                <View className='rounded-full h-24 w-24 items-center justify-center bg-secondary-900'>
                    <MaterialIcons name="music-off" size={35} color={themeColors.secondary[500]} />
                </View>
                <Text className='text-2xl mt-4 font-semibold text-secondary-300 text-center'>No sounds found</Text>
                <Text className='text-sm text-secondary-500 text-center'>Try searching for a different name</Text>
            </View>
        );
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' >
            <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder='Search music or artists'
                onSubmitEditing={handleSearchQuery}
                icon={<AntDesign name='search1' size={24} color={"#83868a"}
                    style={{ marginLeft: 10 }} />}
            />
            <FlatList
                className='mb-14'
                data={filteredSongs}
                scrollEnabled={false}
                ItemSeparatorComponent={ItemDivider}
                ListFooterComponent={filteredSongs.length > 0 ? ItemDivider : undefined}
                ListEmptyComponent={EmptyListRender()}
                renderItem={({ item: track }) => <TrackListItem track={track} onTrackSelect={handleOnTrackSelect} />
                }
            />
        </ScrollView>
    )
}

export default TracksList