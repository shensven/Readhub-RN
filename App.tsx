import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native-bars';
import {useAppearance} from '@/utils/appearance';
import {useAsyncStorageFlipperPlugin} from '@/utils/asyncStorage';
import AppStack from './src/AppStack';

function App() {
  useAsyncStorageFlipperPlugin();
  const {statusBarStyle, paperTheme} = useAppearance();

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar animated={true} barStyle={statusBarStyle} />
      <AppStack />
    </PaperProvider>
  );
}

export default App;
