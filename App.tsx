import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReadhubnCtx, ReadhubProvider} from './src/utils/readhubnContext';
import {paperLight} from './src/theme/default';
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
  const {listHasRead, setListHasRead} = useContext(ReadhubnCtx);

  const initListHasRead = async () => {
    if (listHasRead.length === 0) {
      const resp = await AsyncStorage.getItem('@listHasRead');
      setListHasRead(resp ? JSON.parse(resp) : []);
    }
  };

  return (
    <PaperProvider theme={paperLight}>
      <NavigationContainer
        onReady={() =>
          setTimeout(() => {
            initListHasRead();
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
    </PaperProvider>
  );
};

export default () => (
  <ReadhubProvider>
    <App />
  </ReadhubProvider>
);
