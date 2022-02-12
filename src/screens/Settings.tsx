import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {List, TouchableRipple, useTheme} from 'react-native-paper';
import IcRoundAutoAwesome from '../icons/IcRoundAutoAwesome';
import IcRoundDelete from '../icons/IcRoundDelete';
import IcRoundShield from '../icons/IcRoundShield';
import IcRoundCode from '../icons/IcRoundCode';
import IcRoundBugReport from '../icons/IcRoundBugReport';
import IcRoundArticle from '../icons/IcRoundArticle';
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
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const data = [
    {
      title: '欢迎',
      leftIcon: <IcRoundAutoAwesome />,
      rightIcon: <IcRoundChevronRight />,
      onPress: () => navigation.navigate('Welcome'),
    },
    {
      title: '重置阅读进度',
      leftIcon: <IcRoundDelete />,
      rightIcon: <IcRoundChevronRight />,
      onPress: () => {},
    },
    {
      title: '隐私政策',
      leftIcon: <IcRoundShield />,
      rightIcon: <IcRoundChevronRight />,
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: '开源库',
      leftIcon: <IcRoundCode />,
      rightIcon: <IcRoundChevronRight />,
      onPress: () => navigation.navigate('OpenSourceLibraries'),
    },
    {
      title: '反馈',
      description: 'https://github.com/shensven/Readhubn/issues',
      leftIcon: <IcRoundBugReport />,
      rightIcon: <IcRoundOpenInNew size={16} />,
      onPress: () => Linking.openURL('https://github.com/shensven/Readhubn/issues'),
    },
    {
      title: '关于',
      leftIcon: <IcRoundArticle />,
      rightIcon: <IcRoundChevronRight />,
      onPress: () => navigation.navigate('About'),
    },
  ];

  const renderCard = ({item}: {item: SettingsItem}) => {
    return (
      <TouchableRipple rippleColor={colors.ripple} style={styles.item} onPress={item.onPress}>
        <List.Item
          title={item.title}
          description={item.description}
          descriptionStyle={[styles.description, {color: colors.textAccent}]}
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
  },
  description: {
    fontSize: 10,
  },
});

export default Settings;
