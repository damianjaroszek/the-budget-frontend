import {createSlice} from "@reduxjs/toolkit";

interface FrontendComponentsStateInterface {
    activeMenu: boolean;
}

const initialState: FrontendComponentsStateInterface = {
    activeMenu: true,
}

interface setActiveMenu {
    payload: boolean;
}

export const FrontendComponentsStateSlice = createSlice({
    name: 'frontendComponentsState',
    initialState,
    reducers: {
        setActiveMenu: (state, action: setActiveMenu) => {
            state.activeMenu = action.payload;
        }
    }
});

export const {setActiveMenu} = FrontendComponentsStateSlice.actions;
