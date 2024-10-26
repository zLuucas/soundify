import React, { ReactNode } from 'react'
import { View } from 'react-native'
import ProfileOptionsMenuButton from './ProfileOptionsMenuButton'

type Action = {
    title: string,
    icon: ReactNode,
    action: () => void
}

type ProfileOptionsMenuProps = {
    actions: Action[]
}

const ProfileOptionsMenu = ({ actions }: ProfileOptionsMenuProps) => {
    return (
        <View className='w-[90%] rounded-lg pt-5'>
            {actions.map(({ title, icon, action }, index) => {

                const isLast = index === actions.length - 1;
                const isFirst = index === 0;

                return <ProfileOptionsMenuButton key={index} icon={icon} title={title} onPress={action} isFirst={isFirst} isLast={isLast} />
            })}
        </View>
    )
}

export default ProfileOptionsMenu