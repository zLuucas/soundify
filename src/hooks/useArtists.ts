import { useEffect, useState } from "react";
import library from '@/assets/data/library.json'
import { Track } from "react-native-track-player";
import { Artist } from "../types";

export const useArtists = () => {

    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {

        const fullLibrary = library as Track[];

        const artistsArray = fullLibrary.reduce((acc, track: Track) => {
            const existingArtist = acc.find((artist) => artist.name === track.artist);

            if (existingArtist) {
                existingArtist.tracks.push(track);
            } else {
                acc.push({
                    name: track.artist ?? 'Unknown Artist',
                    tracks: [track]
                });
            }

            return acc;
        }, [] as Artist[]);

        const sortedArtists = artistsArray.sort((a, b) => a.name.localeCompare(b.name));

        setArtists(sortedArtists);

    }, []);

    const getArtist = (artistName: string) => {
        return artists.find((artist) => artist.name === artistName);
    }

    const getArtistTracks = (artistName: string) => {
        const artist = artists.find((artist) => artist.name === artistName);

        return artist?.tracks ?? [];
    };

    return { artists, getArtistTracks, getArtist };

};