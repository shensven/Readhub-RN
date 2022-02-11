import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

const Home: React.FC = () => {
  const {colors} = useTheme();
  const randomWidth = useSharedValue(10);

  const config: any = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
      backgroundColor: colors.primary,
    };
  });

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.animated, style]} />
      <Button style={styles.btn} onPress={() => (randomWidth.value = Math.random() * 350)}>
        toggle
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    margin: 16,
  },
  animated: {
    width: 100,
    height: 80,
  },
  btn: {
    marginTop: 16,
  },
});

export default Home;
