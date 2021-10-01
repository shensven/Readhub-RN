import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import Home from './src/screens/Home';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer
      onReady={() =>
        setTimeout(() => {
          RNBootSplash.hide({fade: true});
        }, 200)
      }>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
