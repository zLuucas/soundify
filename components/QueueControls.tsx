import themeColors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Text, View, ViewProps } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Track } from 'react-native-track-player';

type QueueControlsProps = {
    tracks: Track[];
    onPlay: () => void;
    onShufflePlay: () => void;
} & ViewProps;

const QueueControls = ({ tracks, className, onPlay, onShufflePlay, ...viewProps }: QueueControlsProps) => {

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