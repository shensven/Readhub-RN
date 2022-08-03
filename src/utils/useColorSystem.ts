import {useColorScheme} from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {atomAppearance, atomHeaderBlurType, atomStatusBarStyle} from '../atoms/appAtom';
import type {Appearance, StatusBarStyle, HeaderBlurType} from '../atoms/appAtom';
import {storage} from '../../App';
import {useEffect} from 'react';

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
  roundness: 16,
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
  roundness: 16,
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
  const [statusBarStyle, setStatusBarStyle] = useAtom(atomStatusBarStyle);
  const [headerBlurType, setHeaderBlurType] = useAtom(atomHeaderBlurType);
  const [appearance, setAppearance] = useAtom(atomAppearance);

  const updateStatusBarStyle = (_statusBarStyle?: StatusBarStyle) => {
    if (_statusBarStyle && ['light-content', 'dark-content'].includes(_statusBarStyle)) {
      setStatusBarStyle(_statusBarStyle);
    } else {
      if (appearance === 'light') {
        setStatusBarStyle('dark-content');
      } else if (appearance === 'dark') {
        setStatusBarStyle('light-content');
      } else {
        setStatusBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content');
      }
    }
  };

  const updateHeaderBlurType = (_headerBlurType?: HeaderBlurType) => {
    if (_headerBlurType && ['light', 'dark'].includes(_headerBlurType)) {
      setHeaderBlurType(_headerBlurType);
    } else {
      if (appearance === 'followSystem') {
        setHeaderBlurType(colorScheme === 'dark' ? 'dark' : 'light');
      } else {
        setHeaderBlurType(appearance);
      }
    }
  };

  const updateAppearance = (_appearance: Appearance) => {
    if (_appearance === 'light') {
      updateStatusBarStyle('dark-content');
      updateHeaderBlurType('light');
    } else if (_appearance === 'dark') {
      updateStatusBarStyle('light-content');
      updateHeaderBlurType('dark');
    } else {
      updateStatusBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content');
      updateHeaderBlurType(colorScheme === 'dark' ? 'dark' : 'light');
    }
    setAppearance(_appearance);
    storage.set('@appearance', JSON.stringify(_appearance));
  };

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

  useEffect(() => {
    updateStatusBarStyle();
    updateHeaderBlurType();
  }, [colorScheme]);

  return {
    statusBarStyle,
    headerBlurType,
    appearance,
    getPaperAppearance,
    getNavigationAppearance,
    updateAppearance,
  };
};

export default useColorSystem;
