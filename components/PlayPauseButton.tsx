import themeColors from '@/src/constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import TrackPlayer, { isPlaying, useIsPlaying } from 'react-native-track-player';

type PlayPauseButtonProps = {
    iconSize: number;
    style?: string;
};

const PlayPauseButton = ({ iconSize, style }: PlayPauseButtonProps) => {

    const { playing } = useIsPlaying();

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        >
            <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={themeColors.primary[700]} />
        </TouchableOpacity>
    )
}

export default PlayPauseButton