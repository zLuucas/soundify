import themeColors from '@/src/constants/colors'
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Switch, Text, TouchableOpacity, View } from 'react-native'

type SettingsConfigProps = {
    title: string;
    description: string;
    switchValue?: boolean;
    showSeparator?: boolean;
    onSwitchAction?: (value: boolean) => void;
    onPress?: () => void;
}

const SettingsConfig = ({ title, switchValue = false, description, showSeparator = true, onSwitchAction, onPress }: SettingsConfigProps) => {

    const [isEnabled, setIsEnabled] = useState(switchValue);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleSwitchAction = (value: boolean) => {
        if (onSwitchAction) {
            onSwitchAction(value);
            toggleSwitch();
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.8} className='w-full px-4 py-2' onPress={onPress} disabled={!onPress}>
            <View className='flex-row justify-between pt-2 items-center'>
                <View>
                    <Text className='text-white text-lg font-bold'>{title}</Text>
                    <Text className='text-secondary-500'>{description}</Text>
                </View>
                {onSwitchAction && <Switch
                    trackColor={{ false: themeColors.secondary[900], true: themeColors.primary[500] }}
                    thumbColor={'white'}
                    ios_backgroundColor={themeColors.secondary[900]}
                    onValueChange={handleSwitchAction}
                    value={isEnabled}
                />}
                {onPress && <AntDesign
                    name='down'
                    size={20}
                    color={themeColors.secondary[400]}
                />}
            </View>
            {showSeparator && <View className='mt-4 border border-secondary-800 opacity-40' />}
        </TouchableOpacity>
    )
}

export default SettingsConfig