import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import type {SystemBarStyle} from 'react-native-bars';
import type {MD3Theme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationLightTheme, paperLightTheme} from '../appearance';
import type {NavigationTheme} from '../appearance';

const storage: any = createJSONStorage(() => AsyncStorage);

const themeSchemeAtom = atomWithStorage<'light' | 'dark' | 'system'>('themeScheme', 'system', storage);
const statusBarStyleAtom = atom<SystemBarStyle>('dark-content');
const paperThemeAtom = atom<MD3Theme>(paperLightTheme);
const navigationThemeAtom = atom<NavigationTheme>(navigationLightTheme);

export {themeSchemeAtom, statusBarStyleAtom, paperThemeAtom, navigationThemeAtom};
