import {DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useTheme as useNavigationTheme,
} from '@react-navigation/native';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {}
  }
}

// ----------------------------------------------------------------------
//
export const pinkPaperLight = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    // primary: '',
    // accent: '',
    // background: '',
    // surface: '',
    // text: '',
    // disabled: '',
    // placeholder: '',
    // backdrop: '',
    // onSurface: '',
    // notification: '',
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    // regular: '',
    // medium: '',
    // light: '',
    // thin: '',
  },
  animation: {
    ...PaperDarkTheme.animation,
  },
};

// ----------------------------------------------------------------------
//
export const pinkPaperDark = {
  ...PaperDarkTheme,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    // primary: '',
    // accent: '',
    // background: '',
    // surface: '',
    // text: '',
    // disabled: '',
    // placeholder: '',
    // backdrop: '',
    // onSurface: '',
    // notification: '',
  },
  fonts: {
    ...PaperDarkTheme.fonts,
    // regular: '',
    // medium: '',
    // light: '',
    // thin: '',
  },
  animation: {
    ...PaperDarkTheme.animation,
  },
};

// ----------------------------------------------------------------------
//
export const pinkNavigationLight = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    // primary: '',
    // background: '',
    // headerBackground: '',
    // card: '',
    // text: '',
    // border: '',
    // notification: '',
  },
};

export const pinkNavigationDark = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    // primary: '',
    // background: '',
    // headerBackground: '',
    // card: '',
    // text: '',
    // border: '',
    // notification: '',
  },
};
