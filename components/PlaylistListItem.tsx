import { unknownTrackImageUrl } from '@/src/constants/images';
import { Playlist } from '@/src/types';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native';
import PlaylistShortcutsMenu from './PlaylistShortcutsMenu';
import themeColors from '@/src/constants/colors';
import StopPropagation from './StopPropagation';

type PlaylistListItemProps = {
    playlist: Playlist;
    onPlaylistSelect: (playlist: Playlist) => void;
}

const PlaylistListItem = ({ onPlaylistSelect, playlist }: PlaylistListItemProps) => {

    return (
        <StopPropagation>
            <PlaylistShortcutsMenu playlist={playlist} longPress >
                <TouchableHighlight onPress={() => onPlaylistSelect(playlist)}>
                    <View className='flex w-full flex-row gap-3'>
                        <View>
                            <Image
                                source={{
                                    uri: playlist.artworkPreview || unknownTrackImageUrl
                                }}
                                className='w-20 h-20 rounded-lg'
                                style={{
                                    opacity: 1
                                }}
                            />
                        </View>

                        <View className='flex-1 flex-row justify-between'>
                            <View className='w-[90%] ml-2'>
                                <Text
                                    numberOfLines={1}
                                    className='text-xl max-w-[90%] font-semibold text-secondary-300'
                                >
                                    {playlist.name}
                                </Text>
                                {playlist.tracks && (
                                    <Text
                                        numberOfLines={1}
                                        className='mt-1 text-sm  text-secondary-600'
                                    >
                                        {`${playlist.tracks.length} songs`}
                                    </Text>
                                )}
                            </View>
                            <View className='justify-center'>
                                <AntDesign
                                    name='right'
                                    size={20}
                                    color={themeColors.secondary[400]}
                                />
                            </View>

                        </View>
                    </View>
                </TouchableHighlight>
            </PlaylistShortcutsMenu>
        </StopPropagation>
    )
}

export default PlaylistListItem