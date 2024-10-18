import { unknownTrackImageUrl } from '@/src/constants/images';
import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
// import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit';
import themeColors from '@/src/constants/colors';

type TrackListItemProps = {
    track: Track;
    onTrackSelect: (track: Track) => void;
}

const TrackListItem = ({ track, onTrackSelect }: TrackListItemProps) => {

    const { playing } = useIsPlaying();
    const isActiveTrack = useActiveTrack()?.url === track.url;

    return (
        <TouchableHighlight onPress={() => onTrackSelect(track)}>
            <View className='flex w-full flex-row gap-3'>
                <View>
                    <Image
                        source={{
                            uri: track.artwork || unknownTrackImageUrl
                        }}
                        className='w-12 h-12 rounded-lg'
                        style={{
                            opacity: isActiveTrack ? 0.6 : 1
                        }}
                    />

                    {isActiveTrack && (playing ? (
                        <LoaderKit
                            style={{
                                position: 'absolute',
                                top: 18,
                                left: 16,
                                width: 16,
                                height: 16,
                            }}
                            name='LineScaleParty'
                            color={themeColors.secondary[300]}
                        />
                    ) : (
                        <Ionicons style={{
                            position: 'absolute',
                            top: 14,
                            left: 14,
                        }}
                            name='play'
                            size={24}
                            color={themeColors.secondary[300]}
                        />
                    ))}
                </View>

                <View className='flex-1 flex-row justify-between items-center'>
                    <View className='w-[90%]'>
                        <Text
                            numberOfLines={1}
                            className={`text-sm max-w-[90%] font-semibold text-secondary-400 dark:text-secondary-700 ${isActiveTrack && ' text-primary-700'}`}
                        >
                            {track.title}
                        </Text>
                        {track.artist && (
                            <Text
                                numberOfLines={1}
                                className='mt-1 text-sm  text-secondary-700 dark:text-secondary-400'
                            >
                                {track.artist}
                            </Text>
                        )}
                    </View>

                    <Entypo name='dots-three-horizontal' size={18} color={"#83868a"} />
                </View>


            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackArtworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50,
    }
})

export default TrackListItem