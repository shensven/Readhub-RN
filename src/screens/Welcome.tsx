import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('screen').height;

const Welcome: React.FC = () => {
  return (
    <View style={styles.root}>
      <Image source={require('../splash/bootsplash.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: screenHeight / 2 - 256,
    width: 256,
    height: 256,
  },
});

export default Welcome;
