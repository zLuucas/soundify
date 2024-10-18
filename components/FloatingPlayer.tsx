import { unknownTrackImageUrl } from '@/src/constants/images';
import React from 'react'
import { Image, Platform, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { Track, useActiveTrack } from 'react-native-track-player'
import PlayPauseButton from './PlayPauseButton';
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack';
import MovingText from './MovingText';

const FloatingPlayer = ({ className }: ViewProps) => {

    const activeTrack = useActiveTrack();
    const lastActiveTrack = useLastActiveTrack();

    const displayedTrack = activeTrack ?? lastActiveTrack;

    if (!displayedTrack) return null;

    return (
        <TouchableOpacity
            activeOpacity={0.95}
            className={`flex-row bg-secondary-900/95 rounded-xl px-2 py-2.5 absolute left-2 right-2 ${Platform.OS === 'ios' ? 'bottom-[76px]' : 'bottom-[60px]'} items-center`}
        >
            <>
                <Image
                    source={{
                        uri: displayedTrack.artwork || unknownTrackImageUrl
                    }}
                    className='w-12 h-12 rounded-lg'
                />

                <View className='flex-1 overflow-hidden ml-2.5'>
                    <MovingText text={displayedTrack.title ?? ''} animationThreshold={25} />
                    <Text className='text-sm font-semibold pl-1 text-secondary-600'>{displayedTrack.title}</Text>
                </View>

                <View className='items-center flex-row mr-4'>
                    {/* <SkipToButton action='backward' iconSize={24} /> */}
                    <PlayPauseButton iconSize={30} />
                    {/* <SkipToButton action='forward' iconSize={30} /> */}
                </View>
            </>
        </TouchableOpacity>
    )
}

export default FloatingPlayer