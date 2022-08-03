import React from 'react';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {List, TouchableRipple, useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import color from 'color';
import IcRoundAutoAwesome from '../assets/icons/IcRoundAutoAwesome';
import IcRoundDelete from '../assets/icons/IcRoundDelete';
import IcRoundShield from '../assets/icons/IcRoundShield';
import IcRoundCode from '../assets/icons/IcRoundCode';
import IcRoundBugReport from '../assets/icons/IcRoundBugReport';
import IcRoundInfo from '../assets/icons/IcRoundInfo';
import IcRoundChevronRight from '../assets/icons/IcRoundChevronRight';
import IcRoundOpenInNew from '../assets/icons/IcRoundOpenInNew';

type StackParamList = {
  Welcome: undefined;
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
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const {colors} = useTheme();

  const data = [
    {
      title: '欢迎',
      leftIcon: <IcRoundAutoAwesome color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => navigation.navigate('Welcome'),
    },
    {
      title: '重置阅读进度',
      leftIcon: <IcRoundDelete color={color(colors.onBackground).alpha(0.9).toString()} />,
      rightIcon: <IcRoundChevronRight color={color(colors.onBackground).alpha(0.7).toString()} />,
      onPress: () => {},
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
    <FlatList
      data={data}
      renderItem={renderCard}
      keyExtractor={item => item.title}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{height: insets.bottom}}
    />
  );
};

export default Settings;
