import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import IonSearchOutline from '../ionicons/IonSearchOutline';
import IonCogOutline from '../ionicons/IonCogOutline';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
};
type ScreenNavigationProp = NativeStackScreenProps<StackParamList>['navigation'];

const HomeRight: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={styles.root}>
      <IconButton icon={() => <IonSearchOutline size={22} />} onPress={() => navigation.navigate('Search')} />
      <IconButton icon={() => <IonCogOutline />} onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeRight;
