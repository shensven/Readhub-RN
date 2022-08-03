import {useColorScheme} from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {atomAppearance} from '../atoms/appAtom';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      onPrimary: string;
      secondary: string;
      onSecondary: string;
      secondaryContainer: string;
      onSecondaryContainer: string;
      tertiary: string;
      onBackground: string;
      surfaceVariant: string;
      onSurfaceVariant: string;
    }
  }
}

const paperLightTheme = {
  ...PaperDefaultTheme,
  roundness: 12,
  version: 2,
  colors: {
    ...PaperDefaultTheme.colors,
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
  ...PaperDarkTheme,
  roundness: 12,
  version: 2,
  colors: {
    ...PaperDarkTheme.colors,
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

const navigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
  },
};

const navigationDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
  },
};

const useColorSystem = () => {
  const colorScheme = useColorScheme();
  const [appearance] = useAtom(atomAppearance);

  const getPaperAppearance = () => {
    if (appearance === 'light') {
      return paperLightTheme;
    } else if (appearance === 'dark') {
      return paperDarkTheme;
    } else {
      return colorScheme === 'dark' ? paperDarkTheme : paperLightTheme;
    }
  };

  const getNavigationAppearance = () => {
    if (appearance === 'light') {
      return navigationLightTheme;
    } else if (appearance === 'dark') {
      return navigationDarkTheme;
    } else {
      return colorScheme === 'dark' ? navigationDarkTheme : navigationLightTheme;
    }
  };

  return {
    getPaperAppearance,
    getNavigationAppearance,
  };
};

export default useColorSystem;
