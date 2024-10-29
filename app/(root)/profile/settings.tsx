import ModalBottomSheet from '@/components/ModalBottomSheet'
import SettingsConfig from '@/components/SettingsConfig'
import VerticalSelector from '@/components/VerticalSelector'
import { useModalBottomSheet } from '@/src/hooks/useModalBottomSheet'
import { useSettings } from '@/src/hooks/useSettings'
import { AudioQualityOptions } from '@/src/store/userSlice'
import React, { useState } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const getAudioQualityIndex = (audioQuality: AudioQualityOptions) => {
    switch (audioQuality) {
        case AudioQualityOptions.High:
            return 0;
        case AudioQualityOptions.Medium:
            return 1;
        case AudioQualityOptions.Low:
            return 2;
        default:
            return 0;
    }
};

const getAudioQualityOption = (index: number) => {
    switch (index) {
        case 0:
            return AudioQualityOptions.High;
        case 1:
            return AudioQualityOptions.Medium;
        case 2:
            return AudioQualityOptions.Low;
        default:
            return AudioQualityOptions.High;
    }
}

const SettingsScreen = () => {

    const { audioQuality, notifications, usePhoneData, updateAudioQualitySettings, updateNotificationsSettings, updateUsePhoneDataSettings } = useSettings();

    const { bottomSheetRef: audioBottomSheetRef, handlePresentModalPress: openAudioModal, handleSheetChanges: handleAudioSheetChanges, dismiss: dismissActionsModal } = useModalBottomSheet();

    const audioQualityValue = getAudioQualityIndex(audioQuality);

    const handleOnNotificationsChange = (value: boolean) => {
        updateNotificationsSettings(value);
    }

    const handleOnPhoneDataChange = (value: boolean) => {
        updateUsePhoneDataSettings(value);
    }

    const handleOnAudioQualityChange = () => {
        console.log('Audio Quality');
        openAudioModal();
    }

    const handleOnAudioSheetChanges = (index: number) => {

        updateAudioQualitySettings(getAudioQualityOption(index));

        setTimeout(() => {
            dismissActionsModal();
        }, 450);
    }

    return (
        <SafeAreaView className='flex-1 bg-black items-center flex-col'>
            <View className='w-full pt-2'>
                <SettingsConfig
                    title='Notifications'
                    switchValue={notifications}
                    description='Enable to receive notifications'
                    onSwitchAction={handleOnNotificationsChange}
                />
                <SettingsConfig
                    title='Audio Quality'
                    description='Manage your audio quality settings'
                    onPress={handleOnAudioQualityChange}
                />
                <SettingsConfig
                    title='Use Phone Data'
                    switchValue={usePhoneData}
                    description='Enable to use phone data for streaming'
                    onSwitchAction={handleOnPhoneDataChange}
                />
            </View>
            <ModalBottomSheet
                onChange={handleAudioSheetChanges}
                snapPoints={['40%']}
                ref={audioBottomSheetRef}
            >
                <Text className='font-bold text-white text-2xl'>Audio Quality</Text>
                <VerticalSelector
                    actions={['High', 'Medium', 'Low']}
                    selectedAction={audioQualityValue}
                    onActionSelect={handleOnAudioSheetChanges}
                />
            </ModalBottomSheet>

        </SafeAreaView>
    )
}

export default SettingsScreen