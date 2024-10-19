import themeColors from '@/src/constants/colors';
import { formatSecondsToMinutes } from '@/utils';
import React from 'react'
import { Text, View } from 'react-native'
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import TrackPlayer, { useProgress } from 'react-native-track-player';

type PlayerProgressBarProps = {
  style?: string;
};

const PlayerProgressBar = ({ style }: PlayerProgressBarProps) => {

  const { duration, position } = useProgress();

  const isSliding = useSharedValue(false);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  if (isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0;
  }

  return (
    <View className={style}>
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
        onSlidingStart={() => isSliding.value = true}
        onValueChange={async (value) => {
          await TrackPlayer.seekTo(value * duration);
        }}
        onSlidingComplete={async (value) => {
          if (!isSliding.value) return;
          isSliding.value = false;

          await TrackPlayer.seekTo(value * duration);
        }}
      />
      <View className='w-full flex-row justify-between items-center mt-2'>
        <Text className='text-secondary-400 text-sm opacity-75 font-medium'>{trackElapsedTime}</Text>
        <Text className='text-secondary-400 text-sm opacity-75 font-medium'>{trackRemainingTime}</Text>
      </View>
    </View>
  )
}

export default PlayerProgressBar