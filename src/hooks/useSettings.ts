import { useStoreDispatch, useStoreSelector } from "../store/hooks"
import { AudioQualityOptions, updateSettings } from "../store/userSlice";

export const useSettings = () => {

    const { notifications, audioQuality, usePhoneData } = useStoreSelector(state => state.user.settings);
    const dispatch = useStoreDispatch();

    const updateNotificationsSettings = (value: boolean) => {
        dispatch(updateSettings({
            data: {
                notifications: value,
                audioQuality,
                usePhoneData
            }
        }));
    }

    const updateAudioQualitySettings = (value: AudioQualityOptions) => {
        dispatch(updateSettings({
            data: {
                notifications,
                audioQuality: value,
                usePhoneData
            }
        }));
    }

    const updateUsePhoneDataSettings = (value: boolean) => {
        dispatch(updateSettings({
            data: {
                notifications,
                audioQuality,
                usePhoneData: value
            }
        }));
    }

    return { notifications, audioQuality, usePhoneData, updateNotificationsSettings, updateAudioQualitySettings, updateUsePhoneDataSettings };
}