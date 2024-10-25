import themeColors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Text, View, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import TrackPlayer, { Track } from 'react-native-track-player';

type QueueControlsProps = {
    tracks: Track[];
    onPlay: () => void;
    onShufflePlay: () => void;
} & ViewProps;

const QueueControls = ({ tracks, className, onPlay, onShufflePlay, ...viewProps }: QueueControlsProps) => {

    // const handlePlay = async () => {
    //     await TrackPlayer.setQueue(tracks);
    //     await TrackPlayer.play();
    // }

    // const handleShufflePlay = async () => {
    //     const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

    //     await TrackPlayer.setQueue(shuffledTracks);
    //     await TrackPlayer.play();

    //     dispatch(setActiveQueue({ queueId }));

    // }

    return (
        <View className={`flex-row space-x-4 ${className}`} {...viewProps}>
            <View className='flex-1'>
                <TouchableOpacity
                    onPress={onPlay}
                    activeOpacity={0.8}
                    className='p-3 bg-secondary-900 rounded-lg flex-row justify-center items-center space-x-2'
                >
                    <Ionicons name='play' size={22} color={themeColors.primary[700]} />
                    <Text className='text-primary-700 font-semibold text-lg text-center'>
                        Play
                    </Text>
                </TouchableOpacity>
            </View>
            <View className='flex-1'>
                <TouchableOpacity
                    onPress={onShufflePlay}
                    activeOpacity={0.8}
                    className='p-3 bg-secondary-900 rounded-lg flex-row justify-center items-center space-x-2'
                >
                    <Ionicons name='shuffle-sharp' size={22} color={themeColors.primary[700]} />
                    <Text className='text-primary-700 font-semibold text-lg text-center'>
                        Play
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default QueueControls