import { useTrackPlayerRepeatMode } from '@/src/hooks/useTrackPlayerRepeatMode';
import themeColors from '@/src/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RepeatMode } from 'react-native-track-player'
import { match } from 'ts-pattern';
import Icon from './UI/Icon';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue] as const;

type PlayerRepeatToggleProps = {
    size: number;
    classes?: string;
};

const PlayerRepeatToggle = ({ size, classes }: PlayerRepeatToggleProps) => {

    const { repeatMode, changeRepeatMode } = useTrackPlayerRepeatMode();

    const toggleRepeatMode = () => {

        if (repeatMode === undefined || null) return;

        const currentIndex = repeatOrder.indexOf(repeatMode);
        const nextIndex = (currentIndex + 1) % repeatOrder.length;

        changeRepeatMode(repeatOrder[nextIndex]);

    };

    const icon = match(repeatMode).returnType<IconName>()
        .with(RepeatMode.Off, () => 'repeat-off')
        .with(RepeatMode.Track, () => 'repeat-once')
        .with(RepeatMode.Queue, () => 'repeat')
        .otherwise(() => 'repeat-off');

    return (
        <Icon
            icon={
                <MaterialCommunityIcons
                    name={icon}
                    size={size}
                    color={themeColors.secondary[300]}
                />
            }
            onPress={toggleRepeatMode}
        />
    )
}

export default PlayerRepeatToggle