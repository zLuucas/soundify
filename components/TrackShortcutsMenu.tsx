import { useStoreDispatch, useStoreSelector } from "@/src/store/hooks"
import { removeFromPlaylist, savePlaylists, toggleTrackFavorite } from "@/src/store/librarySlice"
import { MenuView } from "@react-native-menu/menu"
import { usePathname, useRouter } from "expo-router"
import { PropsWithChildren, useState } from "react"
import { StyleProp, ViewStyle } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"
import { match } from "ts-pattern"

type TrackShortcutsMenuProps = PropsWithChildren<{
    track: Track;
    longPress?: boolean;
    style?: StyleProp<ViewStyle>;
}>

const TrackShortcutsMenu = ({ children, track, longPress = false, style, }: TrackShortcutsMenuProps) => {

    const isFavorite = useStoreSelector(state => state.library.playlists[0].tracks.includes(track.title ?? ''));

    const dispatch = useStoreDispatch();
    const router = useRouter();

    const activeQueueId = useStoreSelector(state => state.queue.activeQueueId);

    const pathname = usePathname();
    const decodedPathname = decodeURIComponent(pathname);
    const playlistName = decodedPathname.split("/").pop();

    const playlists = useStoreSelector(state => state.library.playlists);

    const showRemoveFromFavorites = playlistName === 'Liked Songs';

    const showRemoveFromPlaylist = playlists.find(playlist => playlist.name === playlistName)?.tracks.includes(track.title ?? '') && playlistName !== 'Liked Songs';

    const handlePressAction = (id: string) => {

        match(id)
            .with('add-to-favorites', async () => {
                dispatch(toggleTrackFavorite({ track }));
                dispatch(savePlaylists());

                // CHECK IF WE ARE PLAYING THE FAVORITES SONGS QUEUE, IF WE DO, ADD THE SONG TO THE QUEUE
                if (activeQueueId === 'Liked Songs') {
                    await TrackPlayer.add(track);
                }

            })
            .with('remove-from-favorites', async () => {
                dispatch(toggleTrackFavorite({ track }));
                dispatch(savePlaylists());

                // CHECK IF WE ARE PLAYING THE FAVORITES SONGS QUEUE, IF WE DO, REMOVE THE SONG FROM THE QUEUE
                if (activeQueueId === 'Liked Songs') {
                    await TrackPlayer.remove(track.id);
                }
            })
            .with('add-to-playlist', async () => {
                router.push(`/(modals)/addToPlaylist?trackUrl=${track.url}`);
            })
            .with('remove-from-playlist', async () => {
                dispatch(removeFromPlaylist({ playlistName: playlistName!, track }));
            })
            .otherwise(() => console.log("No action matched", id));
    }

    return (

        <MenuView
            onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
            shouldOpenOnLongPress={longPress}
            themeVariant="dark"
            style={style}
            isAnchoredToRight
            actions={[
                {
                    id: isFavorite ? 'remove-from-favorites' : 'add-to-favorites',
                    title: isFavorite ? 'Remove from favorites' : 'Add to favorites',
                    image: isFavorite ? 'star.fill' : 'star',
                    attributes: {
                        destructive: isFavorite,
                        hidden: (isFavorite && showRemoveFromPlaylist)
                    }
                },
                {
                    id: 'add-to-playlist',
                    title: 'Add to playlist',
                    image: 'plus',
                },
                {
                    id: 'remove-from-playlist',
                    title: 'Remove from playlist',
                    image: 'minus',
                    attributes: {
                        destructive: true,
                        hidden: !showRemoveFromPlaylist
                    }
                }
            ]}
        >
            {children}
        </MenuView>

    )
}

export default TrackShortcutsMenu