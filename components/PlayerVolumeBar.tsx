import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume';
import themeColors from '@/src/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native'
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

type PlayerVolumeBarProps = {
    style?: string;
};

const PlayerVolumeBar = ({ style }: PlayerVolumeBarProps) => {

    const { volume, updateVolume } = useTrackPlayerVolume();

    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(1);

    progress.value = volume || 0;

    return (
        <View className={style}>
            <View className='flex-row items-center'>
                <Ionicons name='volume-low' size={20} color={themeColors.secondary[400]} />
                <View className='flex-1 flex-row px-2.5'>
                    <Slider
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        containerStyle={{
                            height: 7,
                            borderRadius: 16,
                        }}
                        thumbWidth={0}
                        renderBubble={() => null}
                        theme={{
                            minimumTrackTintColor: themeColors.secondary[100],
                            maximumTrackTintColor: themeColors.secondary[500],
                        }}
                        onValueChange={async (value) => updateVolume(value)}
                    />
                </View>
                <Ionicons name='volume-high' size={20} color={themeColors.secondary[400]} />
            </View>
        </View>
    )
}

export default PlayerVolumeBar