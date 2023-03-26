import React, {useCallback} from 'react';
import {createStackNavigator, HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useAppearance} from './utils/appearance';
import {HeaderLeft, HeaderRight, Home} from './screen/Home';
import {Search} from './screen/Search';
import {Settings} from './screen/Settings';
import {TopicDetail} from './screen/TopicDetail';
import {Welcome} from './screen/Welcome';
import {Appearance} from './screen/Appearance';
import {PrivacyPolicy} from './screen/PrivacyPolicy';
import {OpenSourceLibraries} from './screen/OpenSourceLibraries';
import {About} from './screen/About';

const {Navigator, Screen} = createStackNavigator();

function AppStack() {
  const {navigationTheme} = useAppearance();

  const HomeHeaderLeft = useCallback(
    () => <HeaderLeft color={navigationTheme.colors.primary} />,
    [navigationTheme.dark],
  );
  const HomeHeaderRight = useCallback(() => <HeaderRight />, [navigationTheme.dark]);

  return (
    <NavigationContainer theme={navigationTheme} onReady={() => {}}>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: navigationTheme.colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            backgroundColor: navigationTheme.colors.background,
          },
          cardStyle: {
            backgroundColor: navigationTheme.colors.background,
          },
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}>
        <Screen
          name="Readhub"
          component={Home}
          options={() => ({
            headerTitleAlign: 'left',
            headerTitle: HomeHeaderLeft,
            headerRight: HomeHeaderRight,
          })}
        />
        <Screen name="TopicDetail" component={TopicDetail} options={{headerTitle: '话题详情'}} />
        <Screen name="Search" component={Search} options={{headerTitle: '搜索'}} />
        <Screen name="Settings" component={Settings} options={{headerTitle: '设置'}} />
        <Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerTitle: '欢迎',
            headerTitleStyle: {display: 'none'},
            headerMode: 'screen',
            headerTransparent: true,
            cardStyle: {backgroundColor: navigationTheme.colors.surfaceVariant},
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Screen name="Appearance" component={Appearance} options={{headerTitle: '外观'}} />
        <Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{headerTitle: '隐私政策'}} />
        <Screen name="OpenSourceLibraries" component={OpenSourceLibraries} options={{headerTitle: '开源库'}} />
        <Screen name="About" component={About} options={{headerTitle: '关于'}} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
