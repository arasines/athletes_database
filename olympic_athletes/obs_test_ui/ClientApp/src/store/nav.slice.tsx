import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import config from 'config';
export type ThemeType = 'light' | 'dark';
export interface INavigationState {
  openItem: Array<string>;
  openComponent: string;
  drawerOpen: boolean;
  borderRadius: number;
  fontFamily: string;
  componentDrawerOpen: boolean;
  theme: ThemeType;
}
const initialState: INavigationState = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  theme: (localStorage.getItem('currentTheme') as ThemeType) ?? 'light',
};
const name = 'navigation';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },

    activeComponent(state, action) {
      state.openComponent = action.payload.openComponent;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload.drawerOpen;
    },

    openComponentDrawer(state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen;
    },
    changeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

// exports
export const navActions = { ...slice.actions };
export const navReducer = slice.reducer;
