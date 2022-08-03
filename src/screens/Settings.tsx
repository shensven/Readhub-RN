import React from 'react';
import {Alert, Linking, NativeModules, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {List, TouchableRipple, useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';
import color from 'color';
import IcRoundAutoAwesome from '../assets/icons/IcRoundAutoAwesome';
import IcRoundColorLens from '../assets/icons/IcRoundColorLens';
import IcRoundDelete from '../assets/icons/IcRoundDelete';
import IcRoundShield from '../assets/icons/IcRoundShield';
import IcRoundCode from '../assets/icons/IcRoundCode';
import IcRoundBugReport from '../assets/icons/IcRoundBugReport';
import IcRoundInfo from '../assets/icons/IcRoundInfo';
import IcRoundChevronRight from '../assets/icons/IcRoundChevronRight';
import IcRoundOpenInFull from '../assets/icons/IcRoundOpenInFull';
import IcRoundOpenInNew from '../assets/icons/IcRoundOpenInNew';
import useColorSystem from '../utils/useColorSystem';

type StackParamList = {
  Welcome: undefined;
  Appearance: undefined;
  PrivacyPolicy: undefined;
  OpenSourceLibraries: undefined;
  About: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface SettingsItem {
  title: string;
  description?: string;
  leftIcon: React.ReactElement;
  rightIcon: React.ReactElement;
  onPress: () => void;
}

const Settings: React.FC = () => {
  const {StatusBarManager} = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const {colors} = useTheme();
  const {headerBlurType} = useColorSystem();

  const navigation = useNavigation<ScreenNavigationProp>();

  const resetMark = () => {
    Alert.alert('再次确认', '主页的已读标记将被重置', [
      {text: '取消', style: 'cancel'},
      {text: '确定', style: 'destructive'},
    ]);
  };

  const data = [
    {
      title: '欢迎光临',
      leftIcon: <IcRoundAutoAwesome color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => navigation.navigate('Welcome'),
    },
    {
      title: '外观',
      leftIcon: <IcRoundColorLens color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => navigation.navigate('Appearance'),
    },
    {
      title: '重置已读标记',
      leftIcon: <IcRoundDelete color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundOpenInFull color={color(colors.onBackground).alpha(0.7).toString()} size={17} />,
      onPress: () => resetMark(),
    },
    {
      title: '隐私政策',
      leftIcon: <IcRoundShield color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: '开源库',
      leftIcon: <IcRoundCode color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => navigation.navigate('OpenSourceLibraries'),
    },
    {
      title: '反馈',
      description: 'https://github.com/shensven/Readhub-RN/issues',
      leftIcon: <IcRoundBugReport color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundOpenInNew color={color(colors.onBackground).alpha(0.7).toString()} size={18} />,
      onPress: () => Linking.openURL('https://github.com/shensven/Readhub-RN/issues'),
    },
    {
      title: '关于',
      leftIcon: <IcRoundInfo color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => navigation.navigate('About'),
    },
  ];

  const renderCard = ({item}: {item: SettingsItem}) => {
    return (
      <TouchableRipple style={{backgroundColor: colors.background}} onPress={item.onPress}>
        <List.Item
          title={item.title}
          titleStyle={{color: colors.onBackground}}
          description={item.description}
          descriptionStyle={{fontSize: 10, color: colors.secondary}}
          left={() => <List.Icon icon={() => item.leftIcon} />}
          right={() => <List.Icon icon={() => item.rightIcon} />}
        />
      </TouchableRipple>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={item => item.title}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: insets.bottom}}
        scrollIndicatorInsets={{top: headerHeight - statusBarHeight}}
        style={{paddingTop: Platform.OS === 'ios' ? headerHeight : 0}}
      />
      {Platform.OS === 'ios' && (
        <BlurView
          blurType={headerBlurType}
          blurAmount={16}
          style={{width: '100%', height: headerHeight, position: 'absolute', top: 0}}
        />
      )}
    </View>
  );
};

export default Settings;
