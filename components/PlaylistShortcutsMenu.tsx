import { useStoreDispatch } from "@/src/store/hooks"
import { deletePlaylist, savePlaylists } from "@/src/store/librarySlice"
import { Playlist } from "@/src/types"
import { MenuView } from "@react-native-menu/menu"
import { router } from "expo-router"
import { PropsWithChildren } from "react"
import { Alert, StyleProp, ViewStyle } from "react-native"
import { match } from "ts-pattern"

type PlaylistShortcutsMenuProps = PropsWithChildren<{
    playlist: Playlist;
    longPress?: boolean;
    style?: StyleProp<ViewStyle>;
}>

const PlaylistShortcutsMenu = ({ children, playlist, longPress = false, style, }: PlaylistShortcutsMenuProps) => {

    const dispatch = useStoreDispatch();

    const handlePressAction = (id: string) => {

        match(id)
            .with('edit-playlist', async () => {
                router.push(`/(modals)/editPlaylist?id=${playlist.name}`);
            })
            .with('delete-playlist', async () => {
                Alert.alert(
                    "Delete Playlist",
                    `Are you sure you want to delete ${playlist.name}?`,
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Delete",
                            onPress: () => {
                                dispatch(deletePlaylist({ playlistName: playlist.name }));
                                dispatch(savePlaylists());
                            },
                            style: "destructive"
                        }
                    ]
                );
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