import { useEffect, useRef } from 'react';
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
    });

    await TrackPlayer.setVolume(0.2);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {

    const isInitialized = useRef(false);

    useEffect(() => {
        const setup = async () => {
            try {
                await setupPlayer();
                isInitialized.current = true;
                onLoad?.();
            } catch (err) {
                console.error('Failed to setup track player', err);
                isInitialized.current = false;
            }
        }

        setup();

    }, [onLoad]);
}