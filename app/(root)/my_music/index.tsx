
import { Platform, SafeAreaView, View } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import PlaylistsList from '@/components/PlaylistsList';
import { useStoreSelector } from '@/src/store/hooks';
import { Playlist } from '@/src/types';
import { useRouter } from 'expo-router';

const PlaylistsScreen = () => {

    const playlists = useStoreSelector((state) => state.library.playlists);
    const router = useRouter();

    const handleOnPlaylistSelect = (playlist: Playlist) => {
        router.push(`/my_music/${playlist.name}`);
    }

    const handleOnPressCreatePlaylist = () => {
        router.push('/(modals)/createPlaylist');
    }

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <PlaylistsList playlists={playlists} onPlaylistSelect={handleOnPlaylistSelect} onPressCreatePlaylist={handleOnPressCreatePlaylist} />
        </SafeAreaView>
    )
}

export default PlaylistsScreen