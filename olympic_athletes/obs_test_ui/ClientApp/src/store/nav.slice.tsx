import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import config from 'config';
import strings from 'res/string';
export type ThemeType = 'light' | 'dark';
export interface INavigationState {
  openItem: Array<string>;
  openComponent: string;
  drawerOpen: boolean;
  borderRadius: number;
  fontFamily: string;
  componentDrawerOpen: boolean;
  theme: ThemeType;
  title: string;
}
const initialState: INavigationState = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true,
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  theme: (localStorage.getItem('currentTheme') as ThemeType) ?? 'light',
  title: strings.main.project.name,
};
const name = 'navigation';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    activeItem(state, action) {
      state.openItem = action.payload.openItem;
    },
    changeTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
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
