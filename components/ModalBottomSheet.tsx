import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native';
import themeColors from '@/src/constants/colors';

type ModalBottomSheetProps = {
    title?: string;
    onChange: (index: number) => void;
    snapPoints: string[];
}

type Ref = BottomSheetModal;

const ModalBottomSheet = forwardRef<Ref, ModalBottomSheetProps & { children: React.ReactNode }>((props, ref) => {

    const snapPoints = useMemo(() => props.snapPoints, []);

    const renderBackdrop = useCallback((props: any) =>
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            onChange={props.onChange}
            backdropComponent={renderBackdrop}
            keyboardBehavior='extend'
            handleIndicatorStyle={{
                backgroundColor: themeColors.secondary[600],
            }}
            backgroundStyle={{
                backgroundColor: themeColors.secondary[900],
            }}
        >
            <BottomSheetView style={styles.bottomSheet}>
                {props.children}
            </BottomSheetView>
        </BottomSheetModal>
    )
});

const styles = StyleSheet.create({
    bottomSheet: {
        marginVertical: 10,
        alignItems: 'center',
        flex: 1,
    },
})

export default ModalBottomSheet