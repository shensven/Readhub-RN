import {DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useTheme as useNavigationTheme,
} from '@react-navigation/native';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      cardBackground: string;
      cardBackgroundAlreadyRead: string;
      textAccent: string;
      textAlreadyRead: string;
      textForceLight: string;
      ripple: string;
      rippleAccent: string;
      blueText: string;
      blueRipple: string;
    }
  }
}

// ----------------------------------------------------------------------
//
export const paperLight = {
  ...PaperDefaultTheme,
  roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#007498',
    // accent: '',
    // background: '',
    // surface: '',
    cardBackground: 'rgb(255,255,255)',
    cardBackgroundAlreadyRead: 'rgb(255,255,255)',
    text: 'rgb(0,0,0)',
    textAccent: 'rgba(0,0,0,0.5)',
    textAlreadyRead: 'rgba(0,0,0,0.5)',
    textForceLight: '#FFFFFF',
    ripple: 'rgba(128,128,128,0.2)',
    rippleAccent: 'rgba(128,128,128,0.1)',
    blueText: '#007498',
    blueRipple: 'rgba(230,247,255,1)',
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
export const paperDark = {
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
export const navigationLight = {
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

export const navigationDark = {
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
