import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
    // headerLargeTitle: true,
    // headerLargeStyle: {
    //     backgroundColor: "#000"
    // },
    // headerLargeTitleStyle: {
    //     color: "#FFF"
    // },
    headerTitleStyle: {
        fontSize: 20,
    },
    headerTintColor: "#FFF",
    headerTransparent: Platform.OS === "ios",
    headerStyle: {
        backgroundColor: Platform.OS === "ios" ? "transparent" : "#000",
    },
    headerBlurEffect: "dark",
    headerShadowVisible: false,
};

