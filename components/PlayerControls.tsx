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
            <SkipToButton action='backward' iconSize={40} />
            <PlayPauseButton iconSize={45} />
            <SkipToButton action='forward' iconSize={40} />
        </View>
    )
}

export default PlayerControls