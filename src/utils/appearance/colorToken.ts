import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {DefaultTheme as NavigationLightTheme, DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import type {Theme as _NavigationTheme} from '@react-navigation/native';

const paperLightTheme = {
  ...MD3LightTheme,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#006a68',
    onPrimary: '#ffffff',
    secondary: '#4a6362',
    onSecondary: '#ffffff',
    secondaryContainer: '#cce8e6',
    onSecondaryContainer: '#051f1f',
    tertiary: '#4a607b',
    onTertiary: '#ffffff',
    background: '#fafdfc',
    onBackground: '#191c1c',
    surface: '#fafdfc',
    onSurferface: '#191c1c',
    surfaceVariant: '#dae5e3',
    onSurfaceVariant: '#3f4948',
  },
};

const paperDarkTheme = {
  ...MD3DarkTheme,
  roundness: 16,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4ddad6',
    onPrimary: '#003736',
    secondary: '#b0ccca',
    onSecondary: '#1b3534',
    secondaryContainer: '#324b4a',
    onSecondaryContainer: '#cce8e6',
    tertiary: '#b2c8e8',
    onTertiary: '#1b324b',
    background: '#191c1c',
    onBackground: '#e0e3e2',
    surface: '#191c1c',
    onSurferface: '#e0e3e2',
    surfaceVariant: '#3f4948',
    onSurfaceVariant: '#bec9c7',
  },
};

interface NavigationTheme extends _NavigationTheme {
  colors: _NavigationTheme['colors'] & {
    onBackground: string;
    surfaceVariant: string;
  };
}

const navigationLightTheme: NavigationTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: paperLightTheme.colors.primary,
    background: paperLightTheme.colors.background,
    onBackground: paperLightTheme.colors.onBackground,
    surfaceVariant: paperLightTheme.colors.surfaceVariant,
  },
};

const navigationDarkTheme: NavigationTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: paperDarkTheme.colors.primary,
    background: paperDarkTheme.colors.background,
    onBackground: paperDarkTheme.colors.onBackground,
    surfaceVariant: paperDarkTheme.colors.surfaceVariant,
  },
  dark: true,
};

export {paperLightTheme, paperDarkTheme, navigationLightTheme, navigationDarkTheme};
export type {NavigationTheme};
