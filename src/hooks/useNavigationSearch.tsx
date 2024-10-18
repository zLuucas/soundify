import { SearchBarProps } from "react-native-screens";
import themeColors from "../constants/colors";
import { useLayoutEffect, useState } from "react";
import { useNavigation } from "expo-router";


const defaultSearchOptions: SearchBarProps = {
    tintColor: themeColors.primary[700],
    textColor: themeColors.secondary[300],
    hideWhenScrolling: false,
}

export const useNavigationSearch = ({ searchBarOptions }: { searchBarOptions?: SearchBarProps }) => {
    const [search, setSearch] = useState<string>('');

    const navigation = useNavigation();

    const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
        setSearch(text);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                ...defaultSearchOptions,
                ...searchBarOptions,
                value: search,
                onChangeText: handleOnChangeText
            }
        })
    }, [navigation, searchBarOptions]);

    return search;
}