import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {useTheme} from 'react-native-paper';
import useColorSystem from './utils/useColorSystem';
import Readhub from './assets/title/Readhub';
import Home from './screens/Home';
import HomeHeaderRight from './screens/components/HomeHeaderRight';
import Search from './screens/Search';
import Settings from './screens/Settings';
import TopicDetail from './screens/TopicDetail';
import Welcome from './screens/Welcome';
import Appearance from './screens/Appearance';
import PrivacyPolicy from './screens/PrivacyPolicy';
import OpenSourceLibraries from './screens/OpenSourceLibraries';
import About from './screens/About';

const Stack = createStackNavigator();

const MainStack: React.FC = () => {
  const {colors} = useTheme();
  const {getNavigationAppearance} = useColorSystem();

  return (
    <NavigationContainer
      theme={getNavigationAppearance()}
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            backgroundColor: colors.background,
          },
          cardStyle: {
            backgroundColor: colors.background,
          },
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}>
        <Stack.Screen
          name="Readhub"
          component={Home}
          options={() => ({
            headerTitleAlign: 'left',
            headerTitle: () => <Readhub color={colors.primary} />,
            headerRight: () => <HomeHeaderRight />,
          })}
        />
        <Stack.Screen
          name="TopicDetail"
          component={TopicDetail}
          options={{
            headerTitle: '话题详情',
            headerTransparent: Platform.OS === 'ios' ? true : false,
          }}
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
            headerTransparent: Platform.OS === 'ios' ? true : false,
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
              backgroundColor: colors.surfaceVariant,
            },
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="Appearance"
          component={Appearance}
          options={{
            headerTitle: '外观',
            headerTransparent: Platform.OS === 'ios' ? true : false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            headerTitle: '隐私政策',
            headerTransparent: Platform.OS === 'ios' ? true : false,
          }}
        />
        <Stack.Screen
          name="OpenSourceLibraries"
          component={OpenSourceLibraries}
          options={{
            headerTitle: '开源库',
            headerTransparent: Platform.OS === 'ios' ? true : false,
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

export default MainStack;
