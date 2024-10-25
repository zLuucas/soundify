import ProfileOptionsMenu from '@/components/ProfileOptionsMenu'
import themeColors from '@/src/constants/colors'
import { unknownArtistImageUrl } from '@/src/constants/images'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const ProfileScreen = () => {
    return (
        <SafeAreaView className='flex-1 bg-black flex-col'>

            <View className='items-center py-10 flex-col space-y-4'>
                <Image className='h-40 w-40 rounded-full' source={{ uri: unknownArtistImageUrl }} />
                <View className='flex-col items-center'>
                    <Text className='text-white text-lg font-bold'>Hello Lucas Matias</Text>
                    <Text className='text-secondary-500 font-semibold'>lucas.matias010@hotmail.com</Text>
                </View>

                <View className='rounded-lg pt-5'>
                    <ProfileOptionsMenu
                        actions={[
                            {
                                icon: <AntDesign name='user' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Edit Profile'
                            },
                            {
                                icon: <AntDesign name='Trophy' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Go Premium'
                            },
                            {
                                icon: <AntDesign name='setting' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Settings'
                            },
                            {
                                icon: <AntDesign name='profile' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Terms and Conditions'
                            },
                            {
                                icon: <AntDesign name='questioncircleo' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Privacy Policy'
                            },
                            {
                                icon: <AntDesign name='infocirlceo' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Help and support'
                            },
                            {
                                icon: <AntDesign name='logout' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Logout'
                            }
                        ]}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen