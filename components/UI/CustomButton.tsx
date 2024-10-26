import themeColors from '@/src/constants/colors';
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  classes?: string;
  loading?: boolean;
  variant?: 'default' | 'text';
}

const CustomButton = ({ title, onPress, classes, loading = false, variant = 'default' }: CustomButtonProps) => {

  const isDefault = variant === 'default';

  const defaultClasses = 'bg-primary-600 w-[40%] h-10 justify-center rounded-full shadow-md shadow-secondary-900';
  const textClasses = 'bg-transparent justify-center rounded-full py-2.5 px-4';

  return (
    <TouchableOpacity
      activeOpacity={isDefault ? 0.8 : 0.5}
      className={`${isDefault ? defaultClasses : textClasses} ${classes}`}
      onPress={onPress}
    >
      {
        !loading
          ? <Text className={`${isDefault ? 'text-black font-semibold text-xl' : 'text-primary-600 font-normal text-lg'}  text-center  `}>
            {title}
          </Text>
          : <ActivityIndicator
            color={themeColors.secondary[800]}
          />
      }
    </TouchableOpacity>
  )
}

export default CustomButton