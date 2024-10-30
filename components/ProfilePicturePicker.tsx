import { launchImageLibraryAsync, MediaTypeOptions, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import React, { useEffect, useState } from 'react'
import { Alert, Pressable, View } from 'react-native'
import { useClerk } from '@clerk/clerk-expo';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';

const ProfilePicturePicker = () => {

    const { user } = useClerk();

    if (!user) return null;

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    const [key, setKey] = useState(0);

    const verifyPermissions = async () => {
        if (cameraPermissionInfo?.status === PermissionStatus.UNDETERMINED) {
            const permissionRes = await requestPermission();

            return permissionRes.granted;
        }

        if (cameraPermissionInfo?.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient Permissions!",
                "You need to grant camera permissions to use this app"
            );

            return false;
        }

        return true;
    };

    const handleTakeImage = async () => {

        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        const image = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
            base64: true,
        });

        if (!image.canceled) {
            const base64Image = `data:image/jpeg;base64,${image.assets[0].base64}`;
            if (base64Image) {
                try {
                    await Image.clearDiskCache();
                    await Image.clearMemoryCache();
                    await user.setProfileImage({ file: base64Image! });
                    setKey((prev) => prev + 1);
                } catch (err: any) {
                    console.error(err.errors);
                }
            }
        }
    };

    return (
        <>
            <Pressable style={({ pressed }) => [{
                opacity: pressed ? 0.8 : 1,
            }]} onPress={handleTakeImage} onLongPress={() => { }}>
                <Image
                    className='h-36 w-36 border border-white rounded-full bg-transparent'
                    source={{
                        uri: user.imageUrl,
                    }}
                    cachePolicy='disk'
                    contentFit='cover'
                />
                <View className='rounded-full bg-secondary-900 border border-secondary-800 p-3 absolute right-0 bottom-0'>
                    <AntDesign name='camerao' size={25} color='white' />
                </View>
            </Pressable>
        </>

    )
}

export default ProfilePicturePicker