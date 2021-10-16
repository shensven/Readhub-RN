import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {SearchProvider} from './src/utils/searchContext';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import DetailTopic from './src/screens/DetailTopic';
import DetailNews from './src/screens/DetailNews';
import Instant from './src/screens/Instant';
import Settings from './src/screens/Settings';
import Welcome from './src/screens/Welcome';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import About from './src/screens/About';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <SearchProvider>
      <NavigationContainer
        onReady={() =>
          setTimeout(() => {
            RNBootSplash.hide({fade: true});
          }, 200)
        }>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <Stack.Navigator
          detachInactiveScreens={!__DEV__}
          initialRouteName="Home"
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
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="DetailTopic" component={DetailTopic} />
          <Stack.Screen name="DetailNews" component={DetailNews} />
          <Stack.Screen name="Instant" component={Instant} options={{...TransitionPresets.ModalPresentationIOS}} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Welcome" component={Welcome} options={{...TransitionPresets.ModalSlideFromBottomIOS}} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </SearchProvider>
  );
};

export default App;
