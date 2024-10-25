import { unknownTrackImageUrl } from '@/src/constants/images';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player';
// import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit';
import themeColors from '@/src/constants/colors';
import { useStoreSelector } from '@/src/store/hooks';
import TrackShortcutsMenu from './TrackShortcutsMenu';
import Icon from './UI/Icon';
import StopPropagation from './StopPropagation';

type TrackListItemProps = {
    track: Track;
    onTrackSelect: (track: Track) => void;
    queueId: string;
    editMode?: boolean;
}

const TrackListItem = ({ track, onTrackSelect, queueId, editMode = false }: TrackListItemProps) => {

    const { playing } = useIsPlaying();

    const activeQueueId = useStoreSelector(state => state.queue.activeQueueId);

    const isActiveTrack = useActiveTrack()?.url === track.url && activeQueueId === queueId;

    const viewRender = () => {
        return (
            <TouchableOpacity
                onPress={() => onTrackSelect(track)}
                delayLongPress={300}
                className='flex-row'
            >
                <View>
                    <Image
                        source={{
                            uri: track.artwork || unknownTrackImageUrl
                        }}
                        className='w-12 h-12 rounded-lg'
                        style={{
                            opacity: isActiveTrack ? 0.6 : 1
                        }}
                    />

                    {isActiveTrack && (playing ? (
                        <LoaderKit
                            style={{
                                position: 'absolute',
                                top: 18,
                                left: 16,
                                width: 16,
                                height: 16,
                            }}
                            name='LineScaleParty'
                            color={themeColors.secondary[300]}
                        />
                    ) : (
                        <Ionicons style={{
                            position: 'absolute',
                            top: 14,
                            left: 14,
                        }}
                            name='play'
                            size={24}
                            color={themeColors.secondary[300]}
                        />
                    ))}
                </View>

                <View className='pl-2 flex-row justify-between items-center'>
                    <View className='w-[90%]'>
                        <Text
                            numberOfLines={1}
                            className={`text-base max-w-[90%] font-semibold text-secondary-400  ${isActiveTrack && ' text-primary-700'}`}
                        >
                            {track.title}
                        </Text>
                        {track.artist && (
                            <Text
                                numberOfLines={1}
                                className='mt-1 text-xs  text-secondary-600 '
                            >
                                {track.artist}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <StopPropagation>
            <View className=''>
                <View className='flex-row items-center justify-center px-5 space-x-4'>

                    {editMode && (
                        <Icon
                            icon={
                                <AntDesign name='minussquare' size={18} color={themeColors.secondary[400]} />
                            }
                            onPress={() => onTrackSelect(track)}
                            classes=''
                        />
                    )}

                    {Platform.OS === 'ios'
                        ? <TrackShortcutsMenu track={track} longPress style={{ flexDirection: 'row' }}>
                            {viewRender()}
                        </TrackShortcutsMenu>
                        : <View className='flex-row'>
                            {viewRender()}
                        </View>
                    }

                    {!editMode && <StopPropagation>
                        <TrackShortcutsMenu track={track} longPress={false}>
                            <Icon
                                icon={
                                    <Entypo name='dots-three-horizontal' size={18} color={"#83868a"} />
                                }
                                onPress={() => { }}
                            />
                        </TrackShortcutsMenu>
                    </StopPropagation>}
                </View>
            </View>
        </StopPropagation >
    )
}

export default TrackListItem