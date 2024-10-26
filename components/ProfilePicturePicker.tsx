import { launchImageLibraryAsync, MediaTypeOptions, PermissionStatus, useCameraPermissions } from 'expo-image-picker';
import React, { useEffect, useState } from 'react'
import { Alert, Image, Pressable, StyleSheet } from 'react-native'
import { useClerk } from '@clerk/clerk-expo';

const ProfilePicturePicker = () => {

    const { user } = useClerk();

    if (!user) return null;

    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState<string | null>();

    useEffect(() => {
    }, [user]);

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
                    await user.setProfileImage({ file: base64Image! });
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
                    className='h-[120px] w-[120px] rounded-full bg-transparent'
                    source={{
                        uri: user.imageUrl,
                    }}
                    resizeMode='cover'
                />
            </Pressable>
        </>

    )
}

export default ProfilePicturePicker