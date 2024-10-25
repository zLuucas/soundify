import themeColors from '@/src/constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react'
import { TouchableOpacity } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';

type PlayPauseButtonProps = {
    iconSize: number;
};

const PlayPauseButton = ({ iconSize }: PlayPauseButtonProps) => {

    const { playing } = useIsPlaying();

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        >
            <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={themeColors.secondary[200]} />
        </TouchableOpacity>
    )
}

export default PlayPauseButton