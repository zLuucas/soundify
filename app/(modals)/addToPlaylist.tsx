import PlaylistsList from '@/components/PlaylistsList'
import { useStoreDispatch, useStoreSelector } from '@/src/store/hooks'
import { addToPlaylist, savePlaylists } from '@/src/store/librarySlice'
import { Playlist } from '@/src/types'
import { getTrackByUrl } from '@/utils'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'

const AddToPlaylist = () => {

    const { trackUrl } = useLocalSearchParams<{ trackUrl: Track['url'] }>();

    const router = useRouter();

    const playlists = useStoreSelector(state => state.library.playlists);
    const { activeQueueId } = useStoreSelector(state => state.queue);
    const dispatch = useStoreDispatch();

    const track = getTrackByUrl(trackUrl);

    if (!track) return null;

    const availablePlaylists = playlists.filter(playlist => (!playlist.tracks.includes(track.title ?? '') && playlist.name !== 'Liked Songs'));

    const handlePlaylistPress = async (playlist: Playlist) => {

        //Add to playlist dispatch
        dispatch(addToPlaylist({ playlistName: playlist.name, track }));
        dispatch(savePlaylists());

        if (activeQueueId?.startsWith(playlist.name)) {
            // Add the track to the queue
            await TrackPlayer.add(track);
        }

        router.dismiss();
    }

    const handleOnPressCreatePlaylist = () => {
        router.push('/(modals)/createPlaylist');
    }

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <PlaylistsList playlists={availablePlaylists} onPlaylistSelect={handlePlaylistPress} onPressCreatePlaylist={handleOnPressCreatePlaylist} />
        </SafeAreaView>
    )
}

export default AddToPlaylist