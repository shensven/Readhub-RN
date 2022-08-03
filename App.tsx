import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {MMKV} from 'react-native-mmkv';
import {StatusBar} from 'react-native-bars';
import useColorSystem from './src/utils/useColorSystem';
import MainStack from './src/MainStack';

export const storage = new MMKV();
export const mmkvAppearance = storage.getString('@appearance');

const App: React.FC = () => {
  const {statusBarStyle, getPaperAppearance} = useColorSystem();

  return (
    <PaperProvider theme={getPaperAppearance()}>
      <StatusBar animated={true} barStyle={statusBarStyle} />
      <MainStack />
    </PaperProvider>
  );
};

export default App;
