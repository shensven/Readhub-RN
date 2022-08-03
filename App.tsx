import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {MMKV} from 'react-native-mmkv';
import useColorSystem from './src/utils/useColorSystem';
import MainStack from './src/MainStack';

export const storage = new MMKV();
export const mmkvAppearance = storage.getString('@appearance');

const App: React.FC = () => {
  const {getPaperAppearance} = useColorSystem();

  return (
    <PaperProvider theme={getPaperAppearance()}>
      <MainStack />
    </PaperProvider>
  );
};

export default App;
