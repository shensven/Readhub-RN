import {atom} from 'jotai';
import type {SystemBarStyle} from 'react-native-bars';
import type {MD3Theme} from 'react-native-paper';
import {navigationLightTheme, paperLightTheme} from '../appearance';
import type {NavigationTheme} from '../appearance';

const themeSchemeAtom = atom<'light' | 'dark' | 'system'>('system');
const statusBarStyleAtom = atom<SystemBarStyle>('dark-content');
const paperThemeAtom = atom<MD3Theme>(paperLightTheme);
const navigationThemeAtom = atom<NavigationTheme>(navigationLightTheme);

export {themeSchemeAtom, statusBarStyleAtom, paperThemeAtom, navigationThemeAtom};
