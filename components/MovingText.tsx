import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { cancelAnimation, Easing, StyleProps, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated'

type MovingTextProps = {
    text: string;
    animationThreshold: number;
    style?: StyleProps;
    className?: string;
}

const MovingText = ({ text, animationThreshold, style, className }: MovingTextProps) => {

    const translateX = useSharedValue(0);
    const shouldAnimate = text.length >= animationThreshold;

    const textWidth = text.length * 3;

    useEffect(() => {
        if (!shouldAnimate) return;

        translateX.value = withDelay(1000, withRepeat(withTiming(
            -textWidth,
            {
                duration: 5000,
                easing: Easing.linear
            }
        ), -1, true));

        return () => {
            cancelAnimation(translateX);
            translateX.value = 0;
        }

    }, [shouldAnimate, textWidth, translateX, animationThreshold, text]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                }
            ]
        }
    });

    return (
        <Animated.Text className={`text-base font-semibold text-secondary-300 ${className}`} numberOfLines={1} style={[
            style,
            animatedStyle,
            shouldAnimate && {
                width: 9999, // preventing the ellipsis from appearing
                paddingLeft: 5, // avoid the initial character being barely visible
            }
        ]}>
            {text}
        </Animated.Text>
    )
}

export default MovingText