import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import HomeRight from './src/headers/HomeRight';
import Search from './src/screens/Search';
import Settings from './src/screens/Settings';
import Welcome from './src/screens/Welcome';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import OpenSourceLibraries from './src/screens/OpenSourceLibraries';
import About from './src/screens/About';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer
      onReady={() =>
        RNBootSplash.hide({
          fade: true,
        })
      }>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}>
        <Stack.Screen
          name="ReadhubNative"
          component={Home}
          options={{
            headerTitle: 'Readhub Native',
            headerTitleAlign: 'left',
            headerRight: () => <HomeRight />,
          }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerTitle: '搜索',
            headerBackTitle: '返回',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: '设置',
            headerBackTitle: '返回',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerTitle: '话题详情',
            headerBackTitle: '返回',
            cardStyle: {
              backgroundColor: '#fff',
            },
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
              backgroundColor: '#E8F6FE',
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
            cardStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
