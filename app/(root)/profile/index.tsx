import ProfileOptionsMenu from '@/components/ProfileOptionsMenu'
import themeColors from '@/src/constants/colors'
import { useUser } from '@/src/hooks/useUser'
import { useClerk } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Image, SafeAreaView, Text, View } from 'react-native'

const ProfileScreen = () => {

    const { signOut } = useClerk();

    const { email, firstName, imageUrl, lastName } = useUser().user;

    const router = useRouter();

    const handleEditProfile = () => {
        router.push(`/(root)/profile/editProfile?firstName=${firstName}&lastName=${lastName}&email=${email}`);
    }

    const handleSettings = () => {
        router.push(`/(root)/profile/settings`);
    }

    const handleSignOut = () => {
        signOut();
        router.replace('/(auth)/sign-in');
    };

    return (
        <SafeAreaView className='flex-1 bg-black flex-col'>

            <View className='items-center py-10 flex-col space-y-4'>
                <Image className='h-36 w-36 rounded-full border border-white' source={{ uri: imageUrl }} />
                <View className='flex-col items-center'>
                    <Text className='text-white text-lg font-bold'>Hello, {firstName} {lastName}</Text>
                    <Text className='text-secondary-500 font-semibold'>{email}</Text>
                </View>

                <View className='rounded-lg pt-5'>
                    <ProfileOptionsMenu
                        actions={[
                            {
                                icon: <AntDesign name='user' size={20} color={themeColors.secondary[400]} />,
                                action: handleEditProfile,
                                title: 'Edit Profile'
                            },
                            {
                                icon: <AntDesign name='Trophy' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Go Premium'
                            },
                            {
                                icon: <AntDesign name='setting' size={20} color={themeColors.secondary[400]} />,
                                action: handleSettings,
                                title: 'Settings'
                            },
                            {
                                icon: <AntDesign name='profile' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Terms and Conditions'
                            },
                            {
                                icon: <AntDesign name='questioncircleo' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Privacy Policy'
                            },
                            {
                                icon: <AntDesign name='infocirlceo' size={20} color={themeColors.secondary[400]} />,
                                action: () => { },
                                title: 'Help and support'
                            },
                            {
                                icon: <AntDesign name='logout' size={20} color={themeColors.secondary[400]} />,
                                action: handleSignOut,
                                title: 'Logout'
                            }
                        ]}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen