import { PropsWithChildren, ReactNode } from "react"
import { TouchableOpacity } from "react-native"

type IconProps = {
    icon: ReactNode;
    onPress?: () => void;
    classes?: string;
}

const Icon = ({ icon, onPress, classes }: IconProps) => {
    return (
        <TouchableOpacity onPress={onPress} className={`items-center justify-center rounded-full ${classes}`}>
            {icon}
        </TouchableOpacity>
    )
}

export default Icon