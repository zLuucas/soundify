import ProfilePicturePicker from '@/components/ProfilePicturePicker'
import CustomButton from '@/components/UI/CustomButton'
import InputField from '@/components/UI/InputField'
import { useUser } from '@/src/hooks/useUser'
import { useClerk } from '@clerk/clerk-expo'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, View } from 'react-native'

const EditProfileScreen = () => {

    const { firstName, lastName, email } = useLocalSearchParams<{ firstName: string; lastName: string; email: string; }>();

    const [isSaving, setIsSaving] = useState(false);


    const { user: storeUser, updateUserInfo: updateUserData } = useUser();

    const [firstNameValue, setFirstNameValue] = useState(firstName);
    const [lastNameValue, setLastNameValue] = useState(lastName);
    const [emailValue, setEmailValue] = useState(email);

    const router = useRouter();

    const handleFirstNameChange = (text: string) => {
        setFirstNameValue(text);
    }

    const handleLastNameChange = (text: string) => {
        setLastNameValue(text);
    }

    const handleEmailChange = (text: string) => {
        setEmailValue(text);
    }

    const { user } = useClerk();

    const handleOnSave = async () => {
        setIsSaving(true);

        try {
            const res = await user?.update({
                firstName: firstNameValue,
                lastName: lastNameValue,
            });

            updateUserData({
                firstName: res?.firstName || storeUser.firstName,
                lastName: res?.lastName || storeUser.lastName,
                email: storeUser.email,
                imageUrl: res?.imageUrl || storeUser.imageUrl,
                settings: storeUser.settings
            });
        } catch (err: any) {
            console.log(err.errors);
            alert('Failed to save profile');
        }

        setIsSaving(false);
        router.dismiss();
    }

    return (
        <SafeAreaView className='flex-1 bg-black items-center flex-col'>
            <View className='py-10 flex-col space-y-4 w-full items-center'>
                <ProfilePicturePicker />
                <View className='w-full px-5'>
                    <InputField label='First Name' labelStyle='font-bold' value={firstNameValue} onChangeText={handleFirstNameChange} />
                    <InputField label='Last Name' labelStyle='font-bold' value={lastNameValue} onChangeText={handleLastNameChange} />
                    <InputField
                        label='Email'
                        labelStyle='font-bold'
                        value={emailValue} onChangeText={handleEmailChange}
                        editable={false}
                    />
                </View>
                <CustomButton loading={isSaving} title='Save' onPress={handleOnSave} classes='mt-10' />
            </View>
        </SafeAreaView>
    )
}

export default EditProfileScreen