import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsData, UserState } from "../types";
import { storeSettings } from "@/utils";

export enum AudioQualityOptions {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}

const initialState: UserState = {
    imageUrl: '',
    firstName: '',
    lastName: '',
    email: '',
    settings: {
        audioQuality: AudioQualityOptions.Low,
        notifications: false,
        usePhoneData: false,
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<UserState>) => {
            const { email, firstName, imageUrl, lastName } = action.payload;

            state.email = email;
            state.firstName = firstName;
            state.imageUrl = imageUrl;
            state.lastName = lastName;
        },
        updateSettings: (state, action: PayloadAction<{ data: SettingsData }>) => {
            const newSettings = action.payload.data;

            state.settings = newSettings;

            const save = async () => {
                await storeSettings(action.payload.data);
            }

            save();
        }
    }
});

export const { updateUserData, updateSettings } = userSlice.actions;
