import CustomButton from '@/components/UI/CustomButton'
import InputField from '@/components/UI/InputField'
import themeColors from '@/src/constants/colors'
import { womanImageUrl } from '@/src/constants/images'
import { useSignUp } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'

const SignUpScreen = () => {

    const router = useRouter();

    const { isLoaded, signUp, setActive } = useSignUp();

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pendingVerification, setPendingVerification] = useState(false)

    const firstStep = !pendingVerification;

    const handleNameChange = (text: string) => {
        setFirstName(text);
    }

    const handleLastNameChange = (text: string) => {
        setLastName(text);
    }

    const handleEmailChange = (text: string) => {
        setEmail(text);
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    }

    const handleOnRegister = async () => {

        if (!firstName || !email || !password || !lastName) {
            return Alert.alert('Fail', 'Please fill all fields');
        }

        setIsLoading(true);
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: email,
                password,
                firstName,
                lastName
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            setPendingVerification(true);
            setIsLoading(false);
        } catch (err: any) {
            Alert.alert('Fail', err.errors[0].message);
            setIsLoading(false);
        }
    }

    const onPressVerify = async (code: string) => {
        if (!code) {
            return Alert.alert('Fail', 'Please enter the code sent to your email');
        }

        setIsLoading(true);

        if (!isLoaded) {
            return
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId })
                setIsLoading(false);
                Alert.alert('Success', 'Account created successfully', [
                    {
                        text: 'OK',
                        onPress: () => {
                            router.replace('/');
                        }
                    }
                ]);
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                Alert.alert('Fail', 'Something went wrong, please try again');
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert('Fail', err.errors[0].message);
        }
    }

    const rendererStep1 = () => {
        return (
            <>
                <View className='mx-5'>
                    <InputField
                        icon={<AntDesign name='user' size={22} color={themeColors.secondary[500]} />}
                        placeholder='Enter your first name'
                        value={firstName}
                        onChangeText={handleNameChange}
                    />
                    <InputField
                        icon={<AntDesign name='user' size={22} color={themeColors.secondary[500]} />}
                        placeholder='Enter your last name'
                        value={lastName}
                        onChangeText={handleLastNameChange}
                    />
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
                    <CustomButton loading={isLoading} title='Create Account' onPress={handleOnRegister} classes='w-[60%] h-12' />
                    <Link href="/sign-in" className='text-lg text-center text-secondary-500 mt-5 '>
                        <Text>Already have an account? </Text>
                        <Text className='text-primary-500'>Log in</Text>
                    </Link>
                </View>
            </>
        );
    }

    const renderOtpStep = () => {
        return (
            <>
                <View className='mx-5 items-center'>
                    <OTPInputView
                        style={{ width: '90%', height: 200 }}
                        pinCount={6}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={onPressVerify}
                    />

                </View>
                <View className='items-center pt-10'>
                    <CustomButton loading={isLoading} title='Verify Email' onPress={handleOnRegister} classes='w-[60%] h-12' />
                    <CustomButton title='Go back' onPress={() => setPendingVerification(false)} classes='mt-4' variant='text' />
                </View>
            </>
        );
    }

    return (
        <View className='bg-black flex-1 flex'>
            <Image
                className='w-full h-full opacity-[0.15] bg-primary-900 absolute'
                resizeMode='cover'
                source={{ uri: womanImageUrl }}
            />
            <SafeAreaView>
                <Text className='text-white text-3xl font-semibold pt-10 px-5'>{firstStep ? 'Register' : 'OTP Verification'}</Text>
                <Text numberOfLines={2} className='text-secondary-500 text-base px-5 pt-2'>{firstStep ? 'Welcome, please create your account \nusing email address' : `Confirmation code has been sent to you, \non your email ${email}`}</Text>
                {firstStep ? rendererStep1() : renderOtpStep()}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: themeColors.secondary[600],
    },

    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: themeColors.secondary[600],
        color: themeColors.secondary[100],
        fontSize: 24,
        fontWeight: 'bold'
    },

    underlineStyleHighLighted: {
        borderColor: themeColors.secondary[100],
    },
});

export default SignUpScreen