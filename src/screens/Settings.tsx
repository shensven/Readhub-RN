import React, {useLayoutEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, StyleSheet} from 'react-native';
import {List, TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

type StackParamList = {
  Help: undefined;
  About: undefined;
};

type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface Item {
  title: string;
  leftIcon: string;
  leftIconSize?: number;
  rightIcon: string;
  screen: keyof StackParamList;
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
      title: '帮助',
      leftIcon: 'help-circle-outline',
      leftIconSize: 24,
      rightIcon: 'chevron-forward-outline',
      screen: 'Help',
    },
    {
      title: '关于',
      leftIcon: 'code-slash-outline',
      leftIconSize: 21,
      rightIcon: 'chevron-forward-outline',
      screen: 'About',
    },
  ];

  const renderCard = ({item}: {item: Item}) => {
    return (
      <TouchableRipple onPress={() => navigation.navigate(item.screen)}>
        <List.Item
          title={item.title}
          titleStyle={styles.title}
          left={() => <List.Icon icon={() => <Ionicons name={item.leftIcon} size={item.leftIconSize ?? 24} />} />}
          right={() => <List.Icon icon={() => <Ionicons name="chevron-forward-outline" size={20} />} />}
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
});

export default Settings;
