import PlayerHeader from '@/components/DismissPlayerSymbol'
import MovingText from '@/components/MovingText'
import PlayerControls from '@/components/PlayerControls'
import PlayerProgressBar from '@/components/PlayerProgressBar'
import PlayerRepeatToggle from '@/components/PlayerRepeatToggle'
import PlayerVolumeBar from '@/components/PlayerVolumeBar'
import themeColors from '@/src/constants/colors'
import { unknownTrackImageUrl } from '@/src/constants/images'
import { AntDesign } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { Redirect, useNavigation, useRouter } from 'expo-router'
import React, { useLayoutEffect } from 'react'
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {

    const activeTrack = useActiveTrack();

    const router = useRouter();

    const { top, bottom } = useSafeAreaInsets();

    const isFavorite = false;

    if (!activeTrack) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator color={themeColors.secondary[400]} />
            </View>
        )
    }

    const toggleFavorite = () => {

    }

    const handleDismiss = () => {
        router.dismiss();
    }

    const handleOptions = () => {

    }

    return (
        <View className='flex-1 bg-black/70 px-5'>
            <PlayerHeader
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onDismiss={handleDismiss}
                onPressOptions={handleOptions}
            />

            <View style={{
                flex: 1,
                marginTop: top + 70,
                marginBottom: bottom,
            }}>
                <View className='flex-row justify-center h-[45%]' style={{
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 11,
                }}>
                    <Image
                        source={{ uri: activeTrack.artwork ?? unknownTrackImageUrl }}
                        resizeMode='cover'
                        className='w-full h-full rounded-xl'
                    />
                </View>

                <View className='flex-1'>
                    <View className={`mt-auto ${Platform.OS === 'ios' ? 'mb-2' : 'mb-6'}`}>
                        <View className='h-[60px] '>
                            <View className='flex-row justify-between items-center'>
                                <View className='flex-1 overflow-hidden'>
                                    <MovingText
                                        text={activeTrack.title ?? ''}
                                        animationThreshold={30}
                                        className='text-2xl font-bold'
                                    />
                                </View>


                            </View>

                            {activeTrack.artist && (
                                <Text className='mt-1.5 text-lg text-secondary-400 mb-2 opacity-80 max-w-[90%]' numberOfLines={1}>{activeTrack.artist}</Text>
                            )}
                        </View>

                        <PlayerProgressBar style='mt-10' />

                        <PlayerControls style='mt-2' />

                    </View>

                    <PlayerVolumeBar style='mt-auto mb-7' />

                    <View className='flex-row justify-center items-center'>
                        {/* <PlayerRepeatToggle size={30} className='mb-1.5' /> */}
                    </View>

                </View>
            </View>
        </View>
    )
}

export default PlayerScreen