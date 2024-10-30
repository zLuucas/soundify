import { FlatList, ScrollView, Text, View } from 'react-native'
import TrackListItem from './TrackListItem'
import SearchBar from './UI/SearchBar'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useMemo, useRef, useState } from 'react'
import TrackPlayer, { Track } from 'react-native-track-player'
import themeColors from '@/src/constants/colors'
import { useStoreDispatch, useStoreSelector } from '@/src/store/hooks'
import { setActiveQueue } from '@/src/store/queueSlice'
import QueueControls from './QueueControls'

type TracksListProps = {
    queueId: string;
    tracks: Track[];
    showQueueControls?: boolean;
    showSearchBar?: boolean;
    classes?: string;
    editMode?: boolean;
    editModeOnPress?: (track: Track) => void;
}

const ItemDivider = () => {
    return (
        <View className='my-2 border border-secondary-700 opacity-30' />
    )
}

const TracksList = ({ queueId, tracks, showQueueControls = true, showSearchBar = true, classes, editMode = false, editModeOnPress }: TracksListProps) => {

    const queueOffset = useRef(0);
    const { activeQueueId } = useStoreSelector((state) => state.queue);
    const dispatch = useStoreDispatch();

    const [searchQuery, setSearchQuery] = useState('');

    const filteredSongs: Track[] = useMemo(() => {
        if (searchQuery === '') return tracks;

        return tracks.filter((track) => {
            return track.title?.toLowerCase().includes(searchQuery.toLowerCase()) || track.artist?.toLowerCase().includes(searchQuery.toLowerCase())
        })
    }, [searchQuery, tracks]);

    const handleOnTrackSelect = async (selectedTrack: Track) => {

        if (!editMode) {

            const trackId = tracks.findIndex((track) => track.url === selectedTrack.url);

            if (trackId === -1) return;

            const hasQueue = (await TrackPlayer.getQueue()).length > 0;

            const isChangingQueue = activeQueueId !== queueId;

            if (isChangingQueue || !hasQueue) {
                const beforeTracks = tracks.slice(0, trackId);
                const afterTracks = tracks.slice(trackId + 1);

                await TrackPlayer.reset();

                // Set the queue
                await TrackPlayer.add(selectedTrack);
                await TrackPlayer.add(afterTracks);
                await TrackPlayer.add(beforeTracks);

                await TrackPlayer.play();

                queueOffset.current = trackId;

                dispatch(setActiveQueue({ queueId }));
            } else {
                const nextTrackId = trackId - queueOffset.current < 0
                    ? tracks.length + trackId - queueOffset.current
                    : trackId - queueOffset.current;

                await TrackPlayer.skip(nextTrackId);
                TrackPlayer.play();
            }
        } else {
            editModeOnPress?.(selectedTrack);
        }
    }

    const EmptyListRender = () => {
        return (
            <View className='mt-60 flex-col items-center'>
                <View className='rounded-full h-24 w-24 items-center justify-center bg-secondary-900'>
                    <MaterialIcons name="music-off" size={35} color={themeColors.secondary[500]} />
                </View>
                <Text className='text-2xl mt-4 font-semibold text-secondary-300 text-center'>{editMode ? 'No sounds' : 'No sounds found'}</Text>
                <Text className='text-sm text-secondary-500 text-center'>{editMode ? 'Your playlist will be empty' : 'Try searching for a different name'}</Text>
            </View>
        );
    }

    const handleOnPlayControl = async () => {
        await TrackPlayer.setQueue(tracks);
        await TrackPlayer.play();

        dispatch(setActiveQueue({ queueId }));

    }

    const handleOnShufflePlayControl = async () => {
        const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);

        await TrackPlayer.setQueue(shuffledTracks);
        await TrackPlayer.play();

        dispatch(setActiveQueue({ queueId }));
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' className={`px-5 ${classes}`} >
            {showSearchBar && <SearchBar
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder='Search music or artists'
                icon={<AntDesign name='search1' size={24} color={"#83868a"}
                    style={{ marginLeft: 10 }} />}
            />}
            <FlatList
                className='mb-14'
                data={filteredSongs}
                scrollEnabled={false}
                ItemSeparatorComponent={ItemDivider}
                ListHeaderComponent={showQueueControls ? <QueueControls tracks={tracks} onPlay={handleOnPlayControl} onShufflePlay={handleOnShufflePlayControl} className='pb-4 pt-2' /> : undefined}
                ListFooterComponent={filteredSongs.length > 0 ? ItemDivider : undefined}
                ListEmptyComponent={EmptyListRender()}
                renderItem={({ item: track }) => <TrackListItem editMode={editMode} track={track} onTrackSelect={handleOnTrackSelect} queueId={queueId} />
                }
            />
        </ScrollView>
    )
}

export default TracksList