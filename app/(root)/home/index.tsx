import { useSettings } from '@/src/hooks/useSettings';
import { updateUserData } from '@/src/store/userSlice';
import { useClerk } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { router, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import Swiper from 'react-native-swiper';
import CustomButton from '@/components/UI/CustomButton';
import themeColors from '@/src/constants/colors';
import { swiperPlaylists } from '@/assets/data/homeplaylists';
import { SafeAreaView } from 'react-native-safe-area-context';
import SidePlaylistsScroll from '@/components/SidePlaylistsScroll';
import UserPlaylistsList from '@/components/UserPlaylistsList';
const { width } = Dimensions.get('window');

const HomeScreen = () => {

    const dispatch = useDispatch();
    const { user } = useClerk();
    const { audioQuality, notifications, usePhoneData } = useSettings();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
        dispatch(updateUserData({
            email: user?.primaryEmailAddress?.emailAddress ?? '',
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            imageUrl: user?.imageUrl ?? '',
            settings: {
                audioQuality,
                notifications,
                usePhoneData
            }
        }));

    }, [user]);

    return (
        <SafeAreaView className='flex-1 bg-black'>
            <ScrollView className='px-5'>
                <View className='flex-row items-center space-x-4 pt-4'>
                    <Image
                        source={{ uri: user?.imageUrl }}
                        className='w-12 h-12 rounded-full border border-white'
                        cachePolicy='disk'
                    />
                    <View>
                        <Text className='text-secondary-100 text-lg font-bold'>Hi, {user?.firstName}</Text>
                        <Text className='text-secondary-500 text-sm'>What you want to listen today?</Text>
                    </View>
                </View>
                <UserPlaylistsList />
                <View className='mt-9'>
                    <View className='justify-between flex-row items-center mb-2'>
                        <Text className='text-secondary-100 font-bold text-xl'>Top Picks</Text>
                        <CustomButton title='View All' variant='text' onPress={(() => { })} classes='my-0 py-0' textClasses='text-sm' />
                    </View>
                    <Swiper style={{ borderRadius: 8 }} height={200} horizontal activeDotColor={themeColors.secondary[100]} dotColor={themeColors.secondary[500]}>
                        {swiperPlaylists.map(({ name, image }, index) => (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => router.navigate('/(root)/songs')} key={index} className='justify-center items-center flex-1 rounded-lg '>
                                <Image
                                    source={{ uri: image }}
                                    className='w-full h-full relative rounded-lg'
                                    contentFit='cover'
                                >
                                    <Text className='absolute bottom-4 left-2 font-bold text-2xl text-white'>
                                        {name}
                                    </Text>
                                </Image>
                            </TouchableOpacity>
                        ))}
                    </Swiper>
                </View>
                <View className='mt-10'>
                    <View className='justify-between flex-row items-center mb-2'>
                        <Text className='text-secondary-100 font-bold text-xl'>Best Genres</Text>
                        <CustomButton title='View All' variant='text' onPress={(() => { })} classes='my-0 py-0' textClasses='text-sm' />
                    </View>
                    <SidePlaylistsScroll />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen