import React from 'react'
import { Image, View } from 'react-native'
import { Track } from 'react-native-track-player'
import TracksList from './TracksList'
import { unknownArtistImageUrl } from '@/src/constants/images'
import { Artist } from '@/src/types'

type ArtistTracksListProps = {
    artist: Artist;
    tracks: Track[];
}

const ArtistTracksList = ({ tracks, artist }: ArtistTracksListProps) => {
    return (
        <View className='flex-1'>
            <View className='items-center py-10'>
                <Image source={{ uri: unknownArtistImageUrl }} className='h-44 w-44 rounded-full' />
            </View>
            <TracksList tracks={tracks} queueId={artist.name} showQueueControls={true} showSearchBar={false} />
        </View>
    )
}

export default ArtistTracksList