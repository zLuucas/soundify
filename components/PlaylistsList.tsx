import { Playlist } from '@/src/types'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import PlaylistListItem from './PlaylistListItem'
import themeColors from '@/src/constants/colors'
import { useRouter } from 'expo-router'

type PlaylistsListProps = {
    playlists: Playlist[];
    onPlaylistSelect: (playlist: Playlist) => void;
    showCreatePlaylistButton?: boolean;
    onPressCreatePlaylist?: () => void;
}

const ItemDivider = () => {
    return (
        <View className='my-2 border border-secondary-700 opacity-30' />
    )
}

const PlaylistsList = ({ playlists, onPlaylistSelect, showCreatePlaylistButton = true, onPressCreatePlaylist }: PlaylistsListProps) => {

    const router = useRouter();

    const EmptyListRender = () => {
        return (
            <View className='mt-60 flex-col items-center'>
                <View className='rounded-full h-24 w-24 items-center justify-center bg-secondary-900'>
                    <MaterialIcons name="music-off" size={35} color={themeColors.secondary[500]} />
                </View>
                <Text className='text-2xl mt-4 font-semibold text-secondary-300 text-center'>No playlists found</Text>
                <Text className='text-sm text-secondary-500 text-center'>Try searching for a different name</Text>
            </View>
        );
    }

    const RenderListHeader = () => {
        return (
            showCreatePlaylistButton ? <TouchableOpacity onPress={onPressCreatePlaylist} className='mb-5 flex-row items-center space-x-4 bg-secondary-900 rounded-lg px-2 py-2'>
                <View className='bg-primary-700 w-10 h-10 rounded-lg items-center justify-center'>
                    <MaterialCommunityIcons name='playlist-music-outline' size={25} color='white' />
                </View>
                <View className='w-full'>
                    <Text className='text-primary-700 text-lg font-bold'>Create a new Playlist</Text>
                </View>
            </TouchableOpacity> : null
        );
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' className='px-5'>
            <FlatList
                className={`${Platform.OS === 'ios' ? 'mt-6 mb-12' : 'mb-16'}`}
                data={playlists}
                scrollEnabled={false}
                ItemSeparatorComponent={ItemDivider}
                ListHeaderComponent={RenderListHeader()}
                ListFooterComponent={playlists.length > 0 ? ItemDivider : undefined}
                ListEmptyComponent={EmptyListRender()}
                renderItem={({ item: playlist }) => <PlaylistListItem playlist={playlist} onPlaylistSelect={() => onPlaylistSelect(playlist)} />
                }
            />
        </ScrollView>
    )
}

export default PlaylistsList