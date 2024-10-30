import { unknownTrackImageUrl } from '@/src/constants/images';
import React, { useEffect } from 'react';
import { Image, Text, Platform, View, TouchableOpacity } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import PlayPauseButton from './PlayPauseButton';
import MovingText from './MovingText';
import { useLastActiveTrack } from '@/src/hooks/useLastActiveTrack';
import { usePathname, useRouter } from 'expo-router';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';

const SWIPE_THRESHOLD = 100;

const FloatingPlayer = () => {
    const router = useRouter();
    const pathName = usePathname();
    const activeTrack = useActiveTrack();
    const { lastActiveTrack, resetLastActiveTrack } = useLastActiveTrack();
    const displayedTrack = activeTrack ?? lastActiveTrack;

    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const pauseTrack = async () => {
        resetLastActiveTrack();
        await TrackPlayer.reset();
    };

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        })
        .onEnd((event) => {
            if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
                translateX.value = withTiming(-300);
                runOnJS(pauseTrack)();
            } else {
                translateX.value = withSpring(0);
            }
        });

    useEffect(() => {
        translateX.value = withSpring(0);
    }, [activeTrack, translateX]);

    if (!displayedTrack) return null;

    const handlePress = () => {
        let pathId = '0';
        if (pathName.includes('songs')) {
            pathId = '1';
        } else if (pathName.includes('my_music')) {
            pathId = '2';
        }
        router.navigate(`/${pathId}`);
    };

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View
                className={`flex-row bg-secondary-900/95 rounded-xl px-2 py-2.5 absolute left-2 right-2 ${Platform.OS === 'ios' ? 'bottom-[76px]' : 'bottom-[60px]'
                    } items-center`}
                style={animatedStyle}
            >
                <TouchableOpacity onPress={handlePress} activeOpacity={0.95} className='flex-row items-center flex-1'>
                    <Image
                        source={{ uri: displayedTrack.artwork || unknownTrackImageUrl }}
                        className='w-12 h-12 rounded-lg'
                    />
                    <View className='flex-1 overflow-hidden ml-2.5 space-y-1'>
                        <MovingText text={displayedTrack.title ?? ''} animationThreshold={25} />
                        <Text className='text-xs font-semibold pl-1 text-secondary-600'>{displayedTrack.artist}</Text>
                    </View>
                </TouchableOpacity>

                <View className='items-center flex-row mx-4'>
                    <PlayPauseButton iconSize={30} />
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

export default FloatingPlayer;