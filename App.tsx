import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import Home from './src/screens/Home';
import FeedDetail from './src/screens/FeedDetail';

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
        detachInactiveScreens={false}
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
          },
          cardOverlayEnabled: true,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="FeedDetail"
          component={FeedDetail}
          options={{
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
