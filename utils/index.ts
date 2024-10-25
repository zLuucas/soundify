import library from '@/assets/data/library.json'
import { Track } from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Playlist } from '@/src/types';

export const formatSecondsToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

export const getTracksByNames = (names: string[]): Track[] => {
    return library.filter((track) => names.includes(track.title)) as Track[];
}

export const getTrackByUrl = (url: string): Track | undefined => {
    return library.find((track) => track.url === url);
}

export const getPathById = (id: string): "home" | "my_music" | "songs" => {
    switch (id) {
        case "0":
            return 'home';
        case "1":
            return 'songs';
        case "2":
            return 'my_music';
        default:
            return 'home';
    }
}

export const storePlaylists = async (playlists: Playlist[]) => {
    try {
        const jsonValue = JSON.stringify(playlists);
        await AsyncStorage.setItem('my-playlists', jsonValue);
    } catch (err) {
        console.log(err);
    }
}

export const getStoredPlaylists = async (): Promise<Playlist[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem('my-playlists');

        const playlists = jsonValue != null ? (JSON.parse(jsonValue) as Playlist[]) : [];

        //Adding Liked Songs playlist if it doesn't exist
        if (playlists.length === 0) {
            playlists.push({
                name: 'Liked Songs',
                tracks: [],
                artworkPreview: ''
            })
        }

        return playlists;

    } catch (err) {
        return [];
    }
}