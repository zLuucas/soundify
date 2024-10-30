import TracksList from '@/components/TracksList'
import CustomButton from '@/components/UI/CustomButton'
import Icon from '@/components/UI/Icon'
import themeColors from '@/src/constants/colors'
import { unknownTrackImageUrl } from '@/src/constants/images'
import { useStoreDispatch, useStoreSelector } from '@/src/store/hooks'
import { savePlaylists, updatePlaylist } from '@/src/store/librarySlice'
import { Playlist } from '@/src/types'
import { getTracksByNames } from '@/utils'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Platform, Text, TextInput, View } from 'react-native'
import { Track } from 'react-native-track-player'

const EditPlaylist = () => {

    const { id } = useLocalSearchParams<{ id: string }>();

    const router = useRouter();
    const dispatch = useStoreDispatch();

    const [playlistName, setPlaylistName] = useState(id);

    const playlists = useStoreSelector((state) => state.library.playlists);

    const songsName = playlists.find((playlist) => playlist.name === id)?.tracks;

    const songs = getTracksByNames(songsName ?? []);

    const [currentTracks, setCurrentTracks] = useState(songs);

    const handleOnPlaylistNameChange = (text: string) => {
        setPlaylistName(text);
    }

    const handleOnClose = () => {
        router.dismiss();
    }

    const handleOnSave = () => {

        const updatedPlaylist: Playlist = {
            name: playlistName,
            tracks: currentTracks.map((track) => track.title!),
            artworkPreview: currentTracks.length > 0 ? currentTracks[0].artwork! : unknownTrackImageUrl
        }

        console.log('updatedPlaylist', updatedPlaylist);

        dispatch(updatePlaylist({ playlist: updatedPlaylist, oldPlaylistName: id }));
        dispatch(savePlaylists());

        router.dismiss();
    }

    const handleOnTrackSelect = (track: Track) => {

        console.log('track', track);

        const trackIndex = currentTracks.findIndex((t) => t.url === track.url);

        if (trackIndex === -1) {
            setCurrentTracks([...currentTracks, track]);
        } else {
            const newTracks = [...currentTracks];
            newTracks.splice(trackIndex, 1);
            setCurrentTracks(newTracks);
        }
    }

    return (
        <View className='flex-1'>
            <LinearGradient className='flex-1 flex-col justify-between pb-10' colors={[
                '#333333',
                '#1A1A1A'
            ]}>
                <View>
                    <View className={`items-end ${Platform.select({ ios: "p-4", android: 'px-4 pt-16' })}`}>
                        <Icon
                            icon={
                                <AntDesign
                                    name='close'
                                    size={25}
                                    color={themeColors.secondary[300]}
                                />
                            }
                            onPress={handleOnClose}
                        />
                    </View>
                    <View className='flex-col justify-center items-center'>
                        {/* <Text className='text-center font-semibold text-2xl text-secondary-100'>Playlist name</Text> */}
                        {id !== 'Liked Songs'
                            ? <TextInput
                                className='border-b border-secondary-400 w-[80%] text-3xl items-center text-secondary-200 font-bold rounded-xl h-16'
                                textAlign='center'
                                value={playlistName}
                                onChangeText={handleOnPlaylistNameChange}
                                cursorColor={themeColors.primary[700]}
                                selectionColor={themeColors.primary[700]}
                                maxLength={25}
                                autoCorrect={false}
                            />
                            :
                            <Text className='text-center font-semibold text-3xl text-secondary-100'>Liked Songs</Text>
                        }
                    </View>
                </View>
                <TracksList
                    editMode
                    editModeOnPress={handleOnTrackSelect}
                    queueId=''
                    tracks={currentTracks ?? []}
                    showSearchBar={false}
                    showQueueControls={false}
                    classes='mt-10'
                />
                <View className='items-center'>
                    <CustomButton title='Save' onPress={handleOnSave} />
                </View>

            </LinearGradient>
        </View>
    )
}

export default EditPlaylist