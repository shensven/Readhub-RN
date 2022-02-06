import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import MdiMagnify from '../icons/MdiMagnify';
import MdiDotsVertical from '../icons/MdiDotsVertical';
import MdiDotsHorizontal from '../icons/MdiDotsHorizontal';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const HomeRight: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={styles.root}>
      <IconButton icon={() => <MdiMagnify />} onPress={() => navigation.navigate('Search')} />
      <IconButton
        icon={() => (Platform.OS === 'ios' ? <MdiDotsHorizontal /> : <MdiDotsVertical />)}
        onPress={() => navigation.navigate('Settings')}
      />
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
