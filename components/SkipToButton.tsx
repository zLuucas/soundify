import themeColors from '@/src/constants/colors';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import TrackPlayer from 'react-native-track-player';

type SkipToNextButtonProps = {
    iconSize: number;
    style?: string;
    action: 'forward' | 'backward';
};

const SkipToButton = ({ iconSize, style, action }: SkipToNextButtonProps) => {

    const handlePress = () => {
        if (action === 'forward') {
            TrackPlayer.skipToNext();
        } else {
            TrackPlayer.skipToPrevious();
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
            <FontAwesome6 name={action === 'forward' ? 'forward-step' : 'backward-step'} size={iconSize} color={themeColors.primary[700]} />
        </TouchableOpacity>
    )
}

export default SkipToButton