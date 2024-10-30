import PlayerHeader from '@/components/PlayerHeader'
import MovingText from '@/components/MovingText'
import PlayerControls from '@/components/PlayerControls'
import PlayerProgressBar from '@/components/PlayerProgressBar'
import PlayerRepeatToggle from '@/components/PlayerRepeatToggle'
import PlayerVolumeBar from '@/components/PlayerVolumeBar'
import themeColors from '@/src/constants/colors'
import { unknownTrackImageUrl } from '@/src/constants/images'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'
import { usePlayerBackground } from '@/src/hooks/usePlayerBackground'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import { savePlaylists, toggleTrackFavorite } from '@/src/store/librarySlice'
import { useStoreSelector } from '@/src/store/hooks'
import { getPathById } from '@/utils'

const PlayerScreen = () => {

    const activeTrack = useActiveTrack();

    const { colors } = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUrl);

    const dispatch = useDispatch();

    const router = useRouter();

    const { player } = useLocalSearchParams();

    const cameFrom = getPathById(player as string);

    const { top, bottom } = useSafeAreaInsets();

    const isFavorite = useStoreSelector((state) => state.library.playlists[0].tracks.includes(activeTrack?.title ?? ''));

    if (!activeTrack) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator color={themeColors.secondary[400]} />
            </View>
        )
    }

    const toggleFavorite = () => {
        dispatch(toggleTrackFavorite({ track: activeTrack }));
        dispatch(savePlaylists());
    }

    const handleDismiss = () => {
        router.dismiss();
    }

    const handleOptions = () => {

    }

    const handleOpenArtistScreen = () => {
        router.navigate(`/(root)/${cameFrom}/artist/${activeTrack.artist}`);
    }

    const getLinearColorsByPlatform = () => {
        if (colors) {
            switch (Platform.OS) {
                case 'android':
                    return [colors.colorTwo.value, colors.colorOne.value];
                case 'ios':
                    return [colors.colorOne.value, colors.colorFour.value];
                default:
                    return ['#000'];
            }
        } else {
            return ['#000'];
        }
    };


    return (
        <LinearGradient style={{ flex: 1 }} colors={colors ? getLinearColorsByPlatform() : ['#000']}>
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
                    <View className='flex-row justify-center h-[45%]'>
                        <Image
                            source={{ uri: activeTrack.artwork ?? unknownTrackImageUrl }}
                            resizeMode='cover'
                            className='w-72 h-72 rounded-full'
                        />
                    </View>

                    <View className='flex-1'>
                        <View className={`${Platform.OS === 'ios' ? 'mb-2' : 'mb-6'}`}>
                            <View className='h-[60px]'>
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
                                    <TouchableOpacity onPress={handleOpenArtistScreen}>
                                        <Text className='mt-1.5 text-lg text-secondary-400 mb-2 opacity-80 max-w-[90%]' numberOfLines={1}>{activeTrack.artist}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>

                            <PlayerProgressBar style='mt-28' />

                            <PlayerControls style='mt-4' />

                        </View>

                        <PlayerVolumeBar style='mt-4 mb-7' />

                        <View className='flex-row justify-center items-center'>
                            <PlayerRepeatToggle size={30} classes='mb-1.5' />
                        </View>

                    </View>
                </View>
            </View>
        </LinearGradient >
    )
}

export default PlayerScreen