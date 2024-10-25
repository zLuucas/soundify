import { TextInputProps } from "react-native";
import { Track } from "react-native-track-player";

declare module '*.png'
declare module '*.jpg'

declare interface InputFieldProps extends TextInputProps {
    type?: "Text" | "Slider";
    label?: string;
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
    onIconRightPress?: () => void;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
    border?: boolean;
    error?: string;
}

declare interface Playlist {
    name: string;
    tracks: string[];
    artworkPreview: string;
}

declare interface Artist {
    name: string;
    tracks: Track[];
}

declare type TrackWithPlaylist = Track & {
    playlist: string[];
}

declare interface UpdatePlaylistPayload {
    playlistName: string;
    track: Track;
}

declare interface ToggleTrackFavoritePayload {
    // trackName: string;
    track: Track;
}

declare interface PlaylistActionPayload {
    playlistName: string;
}

declare interface PlaylistUpdatePayload {
    oldPlaylistName: string;
    playlist: Playlist;
}