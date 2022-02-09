import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      textAccent: string;
    }
  }
}

export const paperDefault = {
  ...PaperDefaultTheme,
  //   roundness: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#387BA0',
    accent: '#E8F6FE',
    // background: '',
    // surface: '',
    textAccent: 'rgba(0,0,0,0.5)',
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
    ...PaperDefaultTheme.animation,
  },
};
