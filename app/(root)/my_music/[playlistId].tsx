import TracksList from '@/components/TracksList';
import { useStoreSelector } from '@/src/store/hooks';
import { getTracksByNames } from '@/utils';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native'

const PlaylistDetails = () => {

    const navigation = useNavigation();

    const { playlistId } = useLocalSearchParams();

    const name = playlistId as string;

    const playlists = useStoreSelector((state) => state.library.playlists);
    
    const songsName = playlists.find((playlist) => playlist.name === name)?.tracks;

    const songs = getTracksByNames(songsName ?? []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: playlistId
        });

    }, [navigation]);

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <TracksList queueId={name} tracks={songs ?? []} />
        </SafeAreaView>
    )
}

export default PlaylistDetails