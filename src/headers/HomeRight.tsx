import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import IonSearchOutline from '../ionicons/IonSearchOutline';
import IonCogOutline from '../ionicons/IonCogOutline';

const HomeRight: React.FC = () => {
  return (
    <View style={styles.root}>
      <IconButton
        icon={() => <IonSearchOutline size={22} />}
        onPress={() => {}}
      />
      <IconButton icon={() => <IonCogOutline />} onPress={() => {}} />
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
