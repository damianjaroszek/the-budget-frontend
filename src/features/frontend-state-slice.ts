import {createSlice} from "@reduxjs/toolkit";

// prepared necessary configuration for Redux-Toolkit to create global state for application
// activeMenu - It shows or hides Sidebar, Navbar components (boolean)
// setActiveMenu - It sets state of activeMenu

interface FrontendComponentsStateInterface {
    activeMenu: boolean;
    screenSize: number | undefined;
}

const initialState: FrontendComponentsStateInterface = {
    activeMenu: true,
    screenSize: undefined,
}

interface setActiveMenu {
    payload: boolean;
}

interface setScreenSize {
    payload: number;
}

export const FrontendComponentsStateSlice = createSlice({
    name: 'frontendComponentsState',
    initialState,
    reducers: {
        setActiveMenu: (state, action: setActiveMenu) => {
            state.activeMenu = action.payload;
        },
        setScreenSize: (state, action: setScreenSize) => {
            state.screenSize = action.payload;
        }
    }
});

export const {setActiveMenu, setScreenSize} = FrontendComponentsStateSlice.actions;
