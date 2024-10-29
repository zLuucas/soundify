import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type VerticalSelectorProps = {
    actions: string[];
    selectedAction: number;
    onActionSelect: (index: number) => void;
}

const VerticalSelector = ({ actions, selectedAction, onActionSelect }: VerticalSelectorProps) => {

    return (
        <View className='flex flex-col w-full px-5 py-10 '>
            {actions.map((action, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={() => onActionSelect(index)} className='py-2'>
                        <Text className={`text-lg text-center text-white font-bold ${selectedAction === index && 'text-primary-700'}`}>{action}</Text>
                    </TouchableOpacity>
                    {index !== actions.length - 1 && <View className='my-2 border border-secondary-800 opacity-40' />}
                </View>
            ))}
        </View>
    )
}

export default VerticalSelector