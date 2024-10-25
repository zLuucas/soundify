import ArtistTracksList from '@/components/ArtistTracksList';
import { useArtists } from '@/src/hooks/useArtists';
import { Redirect, useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const ArtistDetails = () => {

    const navigation = useNavigation();

    const { name: artistName } = useLocalSearchParams<{ name: string }>();

    const { getArtist } = useArtists();

    const artist = getArtist(artistName);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: artistName,
        });
    }, []);

    if (!artist) {
        return <Redirect href={'/(root)/home'} />
    }

    return (
        <SafeAreaView className='bg-black flex-1'>
            <ArtistTracksList artist={artist} tracks={artist.tracks} />
        </SafeAreaView>
    )
}

export default ArtistDetails