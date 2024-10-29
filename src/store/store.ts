import { configureStore } from "@reduxjs/toolkit";
import { librarySlice } from "./librarySlice";
import { queueSlice } from "./queueSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
    reducer: {
        library: librarySlice.reducer,
        queue: queueSlice.reducer,
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch