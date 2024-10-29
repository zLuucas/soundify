import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useRef } from "react";

export const useModalBottomSheet = () => {

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const { dismiss } = useBottomSheetModal();

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
    }, []);

    return { bottomSheetRef, handlePresentModalPress, handleSheetChanges, dismiss };
}