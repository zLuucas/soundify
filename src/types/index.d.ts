import { TextInputProps } from "react-native";

declare module '*.png'
declare module '*.jpg'

// declare interface Track {
//     title: string;
//     artist?: string;
//     artwork?: string;
//     url: string;
// }

declare interface InputFieldProps extends TextInputProps {
    type?: "Text" | "Slider";
    label?: string;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    onIconRightPress?: () => void;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
    border?: boolean;
    error?: string;
}