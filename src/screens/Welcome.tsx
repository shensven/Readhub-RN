import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import {useTheme as usePaperTheme} from 'react-native-paper';
import FocusAwareStatusBar from './components/FocusAwareStatusBar/FocusAwareStatusBar';

const screenHeight = Dimensions.get('screen').height;

const Welcome: React.FC = () => {
  const {colors: paperColor} = usePaperTheme();
  return (
    <View style={[styles.root, {backgroundColor: paperColor.accent}]}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Image source={require('.././assets/Splash/bootsplash.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: screenHeight / 2 - 128,
    width: 256,
    height: 256,
  },
});

export default Welcome;
