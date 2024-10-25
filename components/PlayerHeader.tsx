import themeColors from '@/src/constants/colors';
import { AntDesign, Entypo } from '@expo/vector-icons';
import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from './UI/Icon';

type PlayerHeaderProps = {
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onDismiss: () => void;
    onPressOptions: () => void;
};

const PlayerHeader = ({ isFavorite, onDismiss, onPressOptions, onToggleFavorite }: PlayerHeaderProps) => {

    const { top } = useSafeAreaInsets();

    return (
        <View className='flex-row w-full justify-between ml-2 items-center' style={{ top: top + 20, left: 0, right: 0 }}>
            <Icon
                onPress={onDismiss}
                icon={
                    <AntDesign
                        name='arrowleft'
                        size={25}
                        color={themeColors.secondary[300]}
                    />
                }
            />
            <View accessible={false} className=' ml-3 w-16 h-1 rounded-lg bg-secondary-200 opacity-70' />
            <View className='flex-row'>
                <Icon
                    classes='pr-2'
                    onPress={onToggleFavorite}
                    icon={
                        <AntDesign
                            name={isFavorite ? 'heart' : 'hearto'}
                            size={20}
                            color={isFavorite ? themeColors.primary[700] : themeColors.secondary[300]}
                        />
                    }
                />
                <Icon
                    onPress={onPressOptions}
                    icon={
                        <Entypo
                            name='dots-three-vertical'
                            size={20}
                            color={themeColors.secondary[300]}
                        />
                    }
                />
            </View>
        </View >
    )
}

export default PlayerHeader