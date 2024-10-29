
import themeColors from '@/src/constants/colors'
import { InputFieldProps } from '@/src/types'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'

const InputField = ({ labelStyle, label, icon, secureTextEntry = false, containerStyle, inputStyle, iconStyle, className, ...props }: InputFieldProps) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='my-2 w-full'>
                    {label && <Text className={`text-lg text-secondary-200 ${labelStyle}`}>{label}</Text>}
                    <View className={`flex flex-row justify-start items-center relative bg-transparent border-b border-secondary-500 ${containerStyle}`}>
                        {icon}
                        {/* {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />} */}
                        <TextInput
                            className={`rounded-full ${icon ? 'p-4' : 'py-2'} font-JakartaSemiBold text-[15px] text-white flex-1 ${inputStyle} text-left ${props.editable === false && 'text-secondary-600'}`}
                            secureTextEntry={secureTextEntry}
                            {...props}
                            placeholderTextColor={themeColors.secondary[500]}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField