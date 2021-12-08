import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Alert, FlatList, Linking, Platform, StyleSheet, ToastAndroid, View} from 'react-native';
import {List, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from './components/FocusAwareStatusBar/FocusAwareStatusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReadhubnCtx} from '../utils/readhubnContext';
import {SettingsItem} from '../utils/type';

type StackParamList = {
  Welcome: undefined;
  PrivacyPolicy: undefined;
  OpenSourceLibraries: undefined;
  About: undefined;
};

type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Settings: React.FC = () => {
  const {colors: paperColor} = usePaperTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const {setListHasRead} = useContext(ReadhubnCtx);

  const resetListHasRead = async () => {
    Alert.alert('重置进度', '所有的阅读进度将会被清除', [
      {text: '取消'},
      {
        text: '确定',
        onPress: () => {
          setListHasRead([]);
          AsyncStorage.clear();
          Platform.OS === 'android' && ToastAndroid.show('已清除', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const itemData: SettingsItem[] = [
    {
      title: '欢迎',
      leftIcon: 'pizza-outline',
      leftIconSize: 23,
      rightIcon: 'chevron-forward-outline',
      onPress: () => navigation.navigate('Welcome'),
    },
    {
      title: '重置阅读进度',
      leftIcon: 'trash-outline',
      leftIconSize: 23,
      rightIcon: 'chevron-forward-outline',
      onPress: () => resetListHasRead(),
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
      onPress: () => navigation.navigate('OpenSourceLibraries'),
    },
    {
      title: '反馈',
      leftIcon: 'bug-outline',
      leftIconSize: 23,
      rightIcon: 'open-outline',
      rightIconSize: 16,
      description: 'https://github.com/shensven/Readhubn/issues',
      onPress: () => Linking.openURL('https://github.com/shensven/Readhubn/issues'),
    },
    {
      title: '关于',
      leftIcon: 'shapes-outline',
      leftIconSize: 22,
      rightIcon: 'chevron-forward-outline',
      onPress: () => navigation.navigate('About'),
    },
  ];

  const renderCard = ({item}: {item: SettingsItem}) => {
    return (
      <TouchableRipple rippleColor={paperColor.ripple} onPress={item.onPress}>
        <List.Item
          title={item.title}
          titleStyle={styles.title}
          description={item.description}
          descriptionStyle={[styles.description, {color: paperColor.textAccent}]}
          left={() => <List.Icon icon={() => <Ionicons name={item.leftIcon} size={item.leftIconSize ?? 24} />} />}
          right={() => <List.Icon icon={() => <Ionicons name={item.rightIcon} size={item.rightIconSize ?? 20} />} />}
        />
      </TouchableRipple>
    );
  };

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <FlatList
        data={itemData}
        renderItem={renderCard}
        keyExtractor={(item: SettingsItem) => item.title}
        ListFooterComponent={() => <View />}
        ListFooterComponentStyle={{height: insets.bottom}}
      />
    </>
  );
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
