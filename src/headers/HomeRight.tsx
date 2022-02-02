import React from 'react';
import {StyleSheet, View} from 'react-native';
import IonSearchOutline from '../ionicons/IonSearchOutline';
import IonCogOutline from '../ionicons/IonCogOutline';

const HomeRight: React.FC = () => {
  return (
    <View style={styles.root}>
      <IonSearchOutline size={22} />
      <IonCogOutline />
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
