import themeColors from '@/src/constants/colors'
import { AntDesign } from '@expo/vector-icons'
import { ReactNode } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type ProfileOptionsMenuButtonProps = {
    title: string;
    icon: ReactNode;
    onPress?: () => void;
    isLast?: boolean;
    isFirst?: boolean;
}

const ProfileOptionsMenuButton = ({ title, icon, onPress, isLast = false, isFirst = false }: ProfileOptionsMenuButtonProps) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={`bg-secondary-900 ${isFirst && 'rounded-t-lg'} ${isLast && 'rounded-b-lg'} flex-col w-full px-4`}>
            <View className='flex-row justify-between items-center w-full my-4 h-max'>
                <View className='flex-row items-center space-x-3'>
                    {icon}
                    {/* <AntDesign name='user' size={20} color={themeColors.secondary[400]} /> */}
                    <Text className='text-secondary-400 text-base font-semibold'>{title}</Text>
                </View>
                <AntDesign
                    name='right'
                    size={20}
                    color={themeColors.secondary[400]}
                />
            </View>
            {!isLast && <View className='border border-secondary-800 opacity-40' />}
        </TouchableOpacity>
    )
}

export default ProfileOptionsMenuButton