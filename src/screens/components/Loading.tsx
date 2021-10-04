import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading: React.FC = () => {
  return (
    <View style={styles.root}>
      <LottieView source={require('./loading5.json')} autoPlay loop style={styles.lottie} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 56,
    height: 56,
  },
});

export default Loading;
