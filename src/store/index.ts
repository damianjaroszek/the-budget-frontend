import {configureStore} from "@reduxjs/toolkit";
import {FrontendComponentsStateSlice} from "../features/frontend-state-slice";

export const store = configureStore({
    reducer: {
        frontendComponentsState: FrontendComponentsStateSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
