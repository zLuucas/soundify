import { Track } from "react-native-track-player";
import { Playlist, PlaylistActionPayload, PlaylistUpdatePayload, ToggleTrackFavoritePayload, UpdatePlaylistPayload } from "../types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStoredPlaylists, storePlaylists } from "@/utils";

interface LibraryState {
    playlists: Playlist[];
}

const initialState: LibraryState = {
    playlists: [
        {
            name: 'Liked Songs',
            tracks: [],
            artworkPreview: ''
        }
    ]
}

export const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        addToPlaylist: (state, action: PayloadAction<UpdatePlaylistPayload>) => {
            const { track, playlistName } = action.payload;

            const playlistIndex = state.playlists.findIndex((playlist) => playlist.name === playlistName);

            if (playlistIndex !== -1) {

                if (state.playlists[playlistIndex].tracks.some((t) => t === track.title)) {
                    return;
                }

                if (state.playlists[playlistIndex].tracks.length === 0) {
                    state.playlists[playlistIndex].artworkPreview = track.artwork!;
                }

                state.playlists[playlistIndex].tracks.push(track.title!);
                setPlaylists(state.playlists);
            }
        },
        removeFromPlaylist: (state, action: PayloadAction<UpdatePlaylistPayload>) => {

            const { track, playlistName } = action.payload;

            const playlistIndex = state.playlists.findIndex((playlist) => playlist.name === playlistName);

            if (playlistIndex !== -1) {

                if (state.playlists[playlistIndex].artworkPreview === track.artwork) {
                    state.playlists[playlistIndex].artworkPreview = '';
                }

                state.playlists[playlistIndex].tracks = state.playlists[playlistIndex].tracks.filter((t) => t !== track.title);
            }
        },
        toggleTrackFavorite: (state, action: PayloadAction<ToggleTrackFavoritePayload>) => {

            const { track } = action.payload;

            if (state.playlists[0].tracks.some((t) => t === track.title)) {
                state.playlists[0].tracks = state.playlists[0].tracks.filter((t) => t !== track.title);
            } else {
                state.playlists[0].tracks.push(track.title!);
            }
        },
        createPlaylist: (state, action: PayloadAction<PlaylistActionPayload>) => {
            const { playlistName } = action.payload;

            if (playlistName.length === 0) {
                return;
            }

            if (state.playlists.find((playlist) => playlist.name === playlistName)) {
                return;
            }

            state.playlists.push({
                name: playlistName,
                tracks: [],
                artworkPreview: ''
            });
        },
        deletePlaylist: (state, action: PayloadAction<PlaylistActionPayload>) => {
            const { playlistName } = action.payload;

            if (playlistName === 'Liked Songs') {
                return;
            }

            state.playlists = state.playlists.filter((playlist) => playlist.name !== playlistName);
        },
        updatePlaylist: (state, action: PayloadAction<PlaylistUpdatePayload>) => {

            const { playlist, oldPlaylistName } = action.payload;

            const playlistIndex = state.playlists.findIndex((p) => p.name === oldPlaylistName);

            if (playlistIndex !== -1) {
                state.playlists[playlistIndex] = playlist;
            }
        },
        setPlaylists: (state, action: PayloadAction<Playlist[]>) => {

            const setup = async () => {
                state.playlists = action.payload;
                await storePlaylists(action.payload);
            }

            setup();
        },
        savePlaylists: (state) => {

            const save = async () => {

                await storePlaylists(state.playlists);
            }

            save();
        }
    }
});

export const { addToPlaylist, removeFromPlaylist, toggleTrackFavorite, createPlaylist, deletePlaylist, setPlaylists, savePlaylists, updatePlaylist } = librarySlice.actions;



