import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      textAccent: string;
      ripple: string;
    }
  }
}

export const paperDefault = {
  ...PaperDefaultTheme,
  //   roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#2D6687',
    accent: '#E8F6FE',
    // background: '',
    // surface: '',
    textAccent: 'rgba(0,0,0,0.5)',
    // disabled: '',
    // placeholder: '',
    // backdrop: '',
    // onSurface: '',
    // notification: '',
    ripple: 'rgba(0,0,0,0.1)',
  },
  fonts: {
    ...PaperDefaultTheme.fonts,
    // regular: '',
    // medium: '',
    // light: '',
    // thin: '',
  },
  animation: {
    ...PaperDefaultTheme.animation,
  },
};
