import {createSlice} from "@reduxjs/toolkit";

// prepared necessary configuration for Redux-Toolkit to create global state for application
// activeMenu - It shows or hides Sidebar component (boolean)
// setActiveMenu - It sets state of activeMenu

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
