import Icon from '@/components/UI/Icon'
import themeColors from '@/src/constants/colors'
import { useStoreDispatch } from '@/src/store/hooks'
import { createPlaylist, savePlaylists } from '@/src/store/librarySlice'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const CreatePlaylist = () => {

    const router = useRouter();
    const dispatch = useStoreDispatch();

    const [playlistName, setPlaylistName] = useState('');

    const handleOnPlaylistNameChange = (text: string) => {
        setPlaylistName(text);
    }

    const handleOnClose = () => {
        router.dismiss();
    }

    const handleOnCreatePlaylist = () => {

        if (!playlistName) return;

        dispatch(createPlaylist({ playlistName }));
        dispatch(savePlaylists());
        router.dismiss();
    }

    return (
        <View className='flex-1'>
            <LinearGradient className='flex-1 flex-col space-y-40' colors={[
                '#333333',
                '#1A1A1A'
            ]}>
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
                <View className='flex-col justify-center space-y-16 items-center'>
                    <Text className='text-center font-semibold text-2xl text-secondary-100'>Name your playlist</Text>
                    <TextInput
                        className='border-b border-secondary-400 w-[80%] text-3xl items-center font-bold text-secondary-200 rounded-xl h-16'
                        textAlign='center'
                        value={playlistName}
                        onChangeText={handleOnPlaylistNameChange}
                        ref={input => input?.focus()}
                        onSubmitEditing={handleOnCreatePlaylist}
                        cursorColor={themeColors.primary[700]}
                        selectionColor={themeColors.primary[700]}
                        maxLength={25}
                        autoCorrect={false}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className='bg-primary-600 w-[40%] h-10 justify-center rounded-full shadow-md shadow-secondary-900'
                        onPress={handleOnCreatePlaylist}
                    >
                        <Text className='text-black text-center text-xl font-semibold'>
                            Create
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    )
}

export default CreatePlaylist