import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, Linking, StyleSheet} from 'react-native';
import {List, TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

type StackParamList = {
  PrivacyPolicy: undefined;
  OpenSourceLibrary: undefined;
  About: undefined;
};

type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface Item {
  title: string;
  leftIcon: string;
  leftIconSize?: number;
  rightIcon: string;
  rightIconSize?: number;
  description?: string;
  onPress: () => void;
}

const Settings: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<ScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '设置',
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [navigation, route]);

  const itemData: Item[] = [
    {
      title: '反馈',
      leftIcon: 'mail-outline',
      leftIconSize: 22,
      rightIcon: 'open-outline',
      rightIconSize: 16,
      description: 'https://github.com/shensven/ReadHubn/issues',
      onPress: () => Linking.openURL('https://github.com/shensven/ReadHubn/issues'),
    },
    {
      title: '隐私政策',
      leftIcon: 'shield-outline',
      leftIconSize: 22,
      rightIcon: 'chevron-forward-outline',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      title: '开源库',
      leftIcon: 'code-slash-outline',
      leftIconSize: 22,
      rightIcon: 'chevron-forward-outline',
      onPress: () => navigation.navigate('OpenSourceLibrary'),
    },
    {
      title: '关于',
      leftIcon: 'shapes-outline',
      leftIconSize: 22,
      rightIcon: 'chevron-forward-outline',
      onPress: () => navigation.navigate('About'),
    },
  ];

  const renderCard = ({item}: {item: Item}) => {
    return (
      <TouchableRipple onPress={item.onPress}>
        <List.Item
          title={item.title}
          titleStyle={styles.title}
          description={item.description}
          descriptionStyle={styles.description}
          left={() => <List.Icon icon={() => <Ionicons name={item.leftIcon} size={item.leftIconSize ?? 24} />} />}
          right={() => <List.Icon icon={() => <Ionicons name={item.rightIcon} size={item.rightIconSize ?? 20} />} />}
        />
      </TouchableRipple>
    );
  };

  return <FlatList data={itemData} renderItem={renderCard} keyExtractor={(item, index) => index.toString()} />;
};

const styles = StyleSheet.create({
  title: {
    includeFontPadding: false,
  },
  description: {
    fontSize: 10,
    fontWeight: 'bold',
    includeFontPadding: false,
  },
});

export default Settings;
