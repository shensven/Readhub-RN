/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

const Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
