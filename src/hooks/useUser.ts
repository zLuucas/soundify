import { useDispatch } from "react-redux"
import { useStoreSelector } from "../store/hooks";
import { UserState } from "../types";
import { updateUserData } from "../store/userSlice";

export const useUser = () => {

    const dispatch = useDispatch();
    const user = useStoreSelector(state => state.user);

    const updateUserInfo = (userData: UserState) => {
        dispatch(updateUserData(userData));
    }

    return {
        user,
        updateUserInfo
    }

}