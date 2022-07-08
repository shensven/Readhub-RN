import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {Provider as PaperProvider} from 'react-native-paper';
import coreColor from './src/utils/coreColor';
import Home from './src/screens/Home';
import Readhub from './src/assets/title/Readhub';
import TopicDetail from './src/screens/TopicDetail';
import Search from './src/screens/Search';
import Settings from './src/screens/Settings';
import Welcome from './src/screens/Welcome';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import OpenSourceLibraries from './src/screens/OpenSourceLibraries';
import About from './src/screens/About';
import HeaderRight from './src/screens/Home/HeaderRight';

const Stack = createStackNavigator();

const Router: React.FC = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            backgroundColor: coreColor.background,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: coreColor.primary,
          cardStyle: {
            backgroundColor: coreColor.background,
          },
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}>
        <Stack.Screen
          name="Readhub"
          component={Home}
          options={() => ({
            headerTitle: () => <Readhub color={coreColor.primary} />,
            headerTitleAlign: 'left',
            headerRight: () => <HeaderRight />,
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: '搜索',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: '设置',
          }}
        />
        <Stack.Screen
          name="TopicDetail"
          component={TopicDetail}
          options={{
            headerTitle: '话题详情',
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTitle: '欢迎',
            headerTitleStyle: {
              display: 'none',
            },
            headerMode: 'screen',
            headerTransparent: true,
            cardStyle: {
              backgroundColor: coreColor.surfaceVariant,
            },
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerTitle: '隐私政策',
          }}
        />
        <Stack.Screen
          name="OpenSourceLibraries"
          component={OpenSourceLibraries}
          options={{
            headerTitle: '开源库',
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerTitle: '关于',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <PaperProvider>
      <Router />
    </PaperProvider>
  );
};

export default App;
