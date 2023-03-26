import {useColorScheme} from 'react-native';
import {useAtom} from 'jotai';
import {navigationThemeAtom, paperThemeAtom, statusBarStyleAtom, themeSchemeAtom} from '../status/atom';
import {navigationDarkTheme, navigationLightTheme, paperDarkTheme, paperLightTheme} from './colorToken';

const useAppearance = () => {
  const colorScheme = useColorScheme();

  const [themeScheme, setThemeSchemeAtom] = useAtom(themeSchemeAtom);
  const [statusBarStyle, setStatusBarStyleAtom] = useAtom(statusBarStyleAtom);
  const [paperTheme, setPaperTheme] = useAtom(paperThemeAtom);
  const [navigationTheme, setNavigationTheme] = useAtom(navigationThemeAtom);

  const setAppearance = (scheme: 'light' | 'dark' | 'system') => {
    switch (scheme) {
      case 'light':
        setPaperTheme(paperLightTheme);
        setNavigationTheme(navigationLightTheme);
        setStatusBarStyleAtom('dark-content');
        setThemeSchemeAtom('light');
        break;
      case 'dark':
        setPaperTheme(paperDarkTheme);
        setNavigationTheme(navigationDarkTheme);
        setStatusBarStyleAtom('light-content');
        setThemeSchemeAtom('dark');
        break;
      case 'system':
        setPaperTheme(colorScheme === 'dark' ? paperDarkTheme : paperLightTheme);
        setNavigationTheme(colorScheme === 'dark' ? navigationDarkTheme : navigationLightTheme);
        setStatusBarStyleAtom(colorScheme === 'dark' ? 'light-content' : 'dark-content');
        setThemeSchemeAtom('system');
        break;
      default:
        const n: never = scheme;
        throw new Error(`Unexpected scheme: ${n}`);
    }
  };

  return {themeScheme, statusBarStyle, paperTheme, navigationTheme, setAppearance};
};

export default useAppearance;
