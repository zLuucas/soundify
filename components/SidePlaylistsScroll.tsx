import { genresPlaylists } from '@/assets/data/homeplaylists'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SidePlaylistsScroll = () => {
    return (
        <ScrollView automaticallyAdjustContentInsets horizontal className='flex-1'>
            {genresPlaylists.map(({ image, name }, index) => {

                const isFirst = index === 0;
                const isLast = index === genresPlaylists.length - 1;

                return <TouchableOpacity key={index} activeOpacity={0.8} onPress={(() => router.navigate('/songs'))} className='mb-2'>
                    <Image
                        source={{ uri: image }}
                        cachePolicy='disk'
                        className={`w-40 h-40 rounded-lg mx-3 mt-3 ${isFirst && 'ml-0'} ${isLast && 'mr-0'}`}
                        contentFit='cover'
                    />
                    <Text className='text-secondary-100 text-lg font-bold text-center'>{name}</Text>
                </TouchableOpacity>
            })}
        </ScrollView >
    )
}

export default SidePlaylistsScroll