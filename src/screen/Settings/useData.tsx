import React from 'react';
import {Alert, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import {
  IcRoundAutoAwesome,
  IcRoundBugReport,
  IcRoundChevronRight,
  IcRoundCode,
  IcRoundColorLens,
  IcRoundDelete,
  IcRoundInfo,
  IcRoundOpenInFull,
  IcRoundOpenInNew,
  IcRoundShield,
} from '@/component/icon';
import color from 'color';

type StackParamList = {
  Welcome: undefined;
  Appearance: undefined;
  PrivacyPolicy: undefined;
  OpenSourceLibraries: undefined;
  About: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const useData = () => {
  const {colors} = useTheme();
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

  return data;
};

export default useData;
