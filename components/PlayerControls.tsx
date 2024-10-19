import React from 'react'
import { View } from 'react-native'
import SkipToButton from './SkipToButton'
import PlayPauseButton from './PlayPauseButton'

type PlayerControlsProps = {
    style?: string;
};

const PlayerControls = ({ style }: PlayerControlsProps) => {

    return (
        <View className={`flex-row items-center justify-evenly ${style}`}>
            <SkipToButton action='backward' iconSize={25} />
            <PlayPauseButton iconSize={30} />
            <SkipToButton action='forward' iconSize={25} />
        </View>
    )
}

export default PlayerControls