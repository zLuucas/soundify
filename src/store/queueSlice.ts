import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QueueState {
    activeQueueId: string | null;
}

const initialState: QueueState = {
    activeQueueId: null
}

export const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        setActiveQueue: (state, action: PayloadAction<{ queueId: string }>) => {
            state.activeQueueId = action.payload.queueId;
        },
    }
});

export const { setActiveQueue } = queueSlice.actions;
