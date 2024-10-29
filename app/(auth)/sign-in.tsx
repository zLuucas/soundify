import CustomButton from '@/components/UI/CustomButton'
import InputField from '@/components/UI/InputField'
import themeColors from '@/src/constants/colors'
import { womanImageUrl } from '@/src/constants/images'
import { updateUserData } from '@/src/store/userSlice'
import { useClerk, useSignIn } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, Text, View } from 'react-native'

const SignUpScreen = () => {

    const router = useRouter();

    const { isLoaded, signIn, setActive } = useSignIn();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text: string) => {
        setEmail(text);
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    }

    const handleOnSignin = React.useCallback(async () => {
        setIsLoading(true);
        if (!isLoaded) {
            return;
        }

        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/');
                setIsLoading(false);
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
                Alert.alert('Fail', 'Something went wrong');
                setIsLoading(false);
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert('Fail', err.errors[0].message);
            setIsLoading(false);
        }
    }, [isLoaded, email, password])

    return (
        <View className='bg-black flex-1 flex'>
            <Image
                className='w-full h-full opacity-[0.15] bg-primary-900 absolute'
                resizeMode='cover'
                source={{ uri: womanImageUrl }}
            />
            <SafeAreaView>
                <Text className='text-white text-3xl font-semibold pt-10 px-5'>Login</Text>
                <Text numberOfLines={2} className='text-secondary-500 text-base px-5 pt-2'>Welcome, please fill in with your account {"\n"}email and password</Text>
                <View className='mx-5'>
                    <InputField
                        icon={<AntDesign name='mail' size={22} color={themeColors.secondary[500]} />}
                        placeholder='Enter your email'
                        value={email}
                        onChangeText={handleEmailChange}
                        inputMode='email'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        autoComplete='email'
                    />
                    <InputField
                        icon={<AntDesign name='lock' size={22} color={themeColors.secondary[500]} />}
                        placeholder='Enter your password'
                        secureTextEntry
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                </View>
                <View className='items-center pt-10 space-y-4'>
                    <CustomButton loading={isLoading} title='Login' onPress={handleOnSignin} classes='w-[60%] h-12' />
                    <Link href="/sign-up" className='text-lg text-center text-secondary-500 mt-5 '>
                        <Text>Don't have an account? </Text>
                        <Text className='text-primary-500'>Sign up</Text>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default SignUpScreen