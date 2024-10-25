import themeColors from "@/src/constants/colors";
import { InputFieldProps } from "@/src/types";
import { forwardRef } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableWithoutFeedback, View } from "react-native";

const SearchBar = forwardRef<TextInput, InputFieldProps>(
    ({ labelStyle, label, icon, iconRight, placeholder, secureTextEntry = false, containerStyle, inputStyle, iconStyle, className, error, border, ...props }, ref) => {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className={`w-full ${Platform.OS === 'ios' ? 'mt-4' : 'my-2'} h-12`}>
                        <View className={`flex flex-row justify-start items-center relative bg-secondary-900 rounded-lg focus:border-primary-500 border-neutral-200 dark:border-neutral-600 ${border ? "border" : ""}  ${containerStyle}`}>
                            {icon}
                            <TextInput
                                ref={ref}
                                className={`rounded-lg px-2 py-2.5 text-[15px] flex-1 ${inputStyle} text-secondary-400 ${error ? "text-danger-500 dark:text-danger-800" : ""} text-left`}
                                placeholder={placeholder}
                                placeholderTextColor={"#83868a"}
                                cursorColor={themeColors.primary[700]}
                                selectionColor={themeColors.primary[700]}
                                secureTextEntry={secureTextEntry}
                                {...props}
                            />
                            {iconRight}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
);

export default SearchBar;