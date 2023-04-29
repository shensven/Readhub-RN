import React from 'react';
import {Alert, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {
  IcRoundBugReport,
  IcRoundChevronRight,
  IcRoundCode,
  IcRoundColorLens,
  IcRoundDelete,
  IcRoundInfo,
  IcRoundOpenInFull,
  IcRoundOpenInNew,
  IcRoundShield,
} from '@/component/Icon';
import {useAppearance} from '@/utils/appearance';
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
  const {colors} = useAppearance().paperTheme;
  const navigation = useNavigation<ScreenNavigationProp>();

  const resetMark = () => {
    Alert.alert('再次确认', '主页的已读标记将被重置', [
      {text: '取消', style: 'cancel'},
      {text: '确定', style: 'destructive'},
    ]);
  };

  const data = [
    // {
    //   title: '欢迎光临',
    //   leftIcon: <IcRoundAutoAwesome color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
    //   rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).hexa()} width={24} height={24} />,
    //   onPress: () => navigation.navigate('Welcome'),
    // },
    {
      title: '重置已读标记',
      leftIcon: <IcRoundDelete color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
      rightIcon: <IcRoundOpenInFull color={color(colors.onBackground).alpha(0.7).hexa()} width={16} height={16} />,
      onPress: () => resetMark(),
    },
    {
      title: '外观',
      leftIcon: <IcRoundColorLens color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).hexa()} width={24} height={24} />,
      onPress: () => navigation.navigate('Appearance'),
    },
    {
      title: '隐私政策',
      leftIcon: <IcRoundShield color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).hexa()} width={24} height={24} />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: '开源库',
      leftIcon: <IcRoundCode color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).hexa()} width={24} height={24} />,
      onPress: () => navigation.navigate('OpenSourceLibraries'),
    },
    {
      title: '反馈',
      description: 'https://github.com/shensven/Readhub-RN/issues',
      leftIcon: <IcRoundBugReport color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
      rightIcon: <IcRoundOpenInNew color={color(colors.onBackground).alpha(0.7).hexa()} width={18} height={18} />,
      onPress: () => Linking.openURL('https://github.com/shensven/Readhub-RN/issues'),
    },
    {
      title: '关于',
      leftIcon: <IcRoundInfo color={color(colors.onBackground).alpha(0.9).hexa()} width={24} height={24} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).hexa()} width={24} height={24} />,
      onPress: () => navigation.navigate('About'),
    },
  ];

  return data;
};

export default useData;
