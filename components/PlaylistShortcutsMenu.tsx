import { useStoreDispatch, useStoreSelector } from "@/src/store/hooks"
import { removeFromPlaylist, savePlaylists, toggleTrackFavorite } from "@/src/store/librarySlice"
import { Playlist } from "@/src/types"
import { MenuView } from "@react-native-menu/menu"
import { usePathname, useRouter } from "expo-router"
import { PropsWithChildren, useState } from "react"
import { StyleProp, ViewStyle } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"
import { match } from "ts-pattern"

type PlaylistShortcutsMenuProps = PropsWithChildren<{
    playlist: Playlist;
    longPress?: boolean;
    style?: StyleProp<ViewStyle>;
}>

const PlaylistShortcutsMenu = ({ children, playlist, longPress = false, style, }: PlaylistShortcutsMenuProps) => {

    const router = useRouter();

    const handlePressAction = (id: string) => {

        match(id)
            .with('edit-playlist', async () => {
                router.push(`/(modals)/editPlaylist?id=${playlist.name}`);
            })
            .with('delete-playlist', async () => {

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
                    id: 'edit-playlist',
                    title: 'Edit',
                    image: 'pencil'
                },
                {
                    id: 'delete-playlist',
                    title: 'Delete',
                    image: 'trash',
                    attributes: {
                        destructive: true,
                    }
                }
            ]}
        >
            {children}
        </MenuView>

    )
}

export default PlaylistShortcutsMenu