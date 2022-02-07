import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import IcRoundSearch from '../icons/IcRoundSearch';
import IcRoundMoreVert from '../icons/IcRoundMoreVert';
import IcRoundMoreHoriz from '../icons/IcRoundMoreHoriz';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const HomeRight: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={styles.root}>
      <IconButton icon={() => <IcRoundSearch />} onPress={() => navigation.navigate('Search')} />
      <IconButton
        icon={() => (Platform.OS === 'ios' ? <IcRoundMoreHoriz /> : <IcRoundMoreVert />)}
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
