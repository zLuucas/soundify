import themeColors from '@/src/constants/colors';
import { unknownTrackImageUrl } from '@/src/constants/images';
import { useStoreSelector } from '@/src/store/hooks'
import { Image } from 'expo-image';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import LoaderKit from 'react-native-loader-kit';

const UserPlaylistsList = () => {

    const userPlaylists = useStoreSelector(state => state.library.playlists);

    if (!userPlaylists || userPlaylists.length === 0) {
        return null;
    }

    const { activeQueueId } = useStoreSelector(state => state.queue);

    const maxRowCell = 2;
    const rowNumber = Math.ceil(userPlaylists.length / maxRowCell);

    return (
        <View className='mt-10'>
            {Array.from({ length: rowNumber }).map((_, rowIndex) => (
                <View key={rowIndex} className="flex-row w-full">
                    {userPlaylists
                        .slice(rowIndex * maxRowCell, rowIndex * maxRowCell + maxRowCell)
                        .map(({ name, artworkPreview }, index) => {

                            const isLeft = index === 0;
                            const isRight = index === 1;

                            const isPlaying = activeQueueId === name;

                            console.log(index);
                            return <TouchableOpacity key={index} className={`flex-1 flex-row space-x-2 m-1 items-center bg-secondary-900 rounded ${isLeft && 'ml-0'} ${isRight && ''}`}>
                                <Image
                                    source={{ uri: artworkPreview.length > 0 ? artworkPreview : unknownTrackImageUrl }}
                                    className='w-12 h-12 rounded-l-lg'
                                    cachePolicy='disk'
                                />
                                <Text className='text-secondary-100 font-semibold'>{name}</Text>
                                {isPlaying && <LoaderKit
                                    style={{
                                        position: 'relative',
                                        top: 0,
                                        left: 16,
                                        width: 16,
                                        height: 16,
                                    }}
                                    name='LineScaleParty'
                                    color={themeColors.primary[700]}
                                />}
                            </TouchableOpacity>
                        })
                    }
                    {userPlaylists.slice(rowIndex * maxRowCell, rowIndex * maxRowCell + maxRowCell).length < maxRowCell && (
                        <View className="flex-1 m-1" />
                    )}
                </View>
            ))}
        </View>
    )
}

export default UserPlaylistsList