import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native-bars';
import {useAppearance} from '@/utils/appearance';
import AppStack from './src/AppStack';
import 'react-native-gesture-handler';

function App() {
  const {statusBarStyle, paperTheme} = useAppearance();

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar animated={true} barStyle={statusBarStyle} />
      <AppStack />
    </PaperProvider>
  );
}

export default App;
