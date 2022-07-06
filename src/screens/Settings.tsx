import React from 'react';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {List, TouchableRipple} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import coreColor from '../utils/coreColor';
import IcRoundAutoAwesome from '../icons/IcRoundAutoAwesome';
import IcRoundDelete from '../icons/IcRoundDelete';
import IcRoundShield from '../icons/IcRoundShield';
import IcRoundCode from '../icons/IcRoundCode';
import IcRoundBugReport from '../icons/IcRoundBugReport';
import IcRoundInfo from '../icons/IcRoundInfo';
import IcRoundChevronRight from '../icons/IcRoundChevronRight';
import IcRoundOpenInNew from '../icons/IcRoundOpenInNew';

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

  const data = [
    {
      title: '欢迎',
      leftIcon: <IcRoundAutoAwesome color={coreColor.onBackground} />,
      rightIcon: <IcRoundChevronRight color={coreColor.secondary} />,
      onPress: () => navigation.navigate('Welcome'),
    },
    {
      title: '重置阅读进度',
      leftIcon: <IcRoundDelete color={coreColor.onBackground} />,
      rightIcon: <IcRoundChevronRight color={coreColor.secondary} />,
      onPress: () => {},
    },
    {
      title: '隐私政策',
      leftIcon: <IcRoundShield color={coreColor.onBackground} />,
      rightIcon: <IcRoundChevronRight color={coreColor.secondary} />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: '开源库',
      leftIcon: <IcRoundCode color={coreColor.onBackground} />,
      rightIcon: <IcRoundChevronRight color={coreColor.secondary} />,
      onPress: () => navigation.navigate('OpenSourceLibraries'),
    },
    {
      title: '反馈',
      description: 'https://github.com/shensven/Readhubn/issues',
      leftIcon: <IcRoundBugReport color={coreColor.onBackground} />,
      rightIcon: <IcRoundOpenInNew color={coreColor.secondary} size={16} />,
      onPress: () => Linking.openURL('https://github.com/shensven/Readhubn/issues'),
    },
    {
      title: '关于',
      leftIcon: <IcRoundInfo color={coreColor.onBackground} />,
      rightIcon: <IcRoundChevronRight color={coreColor.secondary} />,
      onPress: () => navigation.navigate('About'),
    },
  ];

  const renderCard = ({item}: {item: SettingsItem}) => {
    return (
      <TouchableRipple style={{backgroundColor: coreColor.background}} onPress={item.onPress}>
        <List.Item
          title={item.title}
          titleStyle={{color: coreColor.onBackground}}
          description={item.description}
          descriptionStyle={{fontSize: 10, color: coreColor.secondary}}
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
