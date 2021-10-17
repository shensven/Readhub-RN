import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Image, StatusBar, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '欢迎',
      headerTransparent: true,
      headerTintColor: '#FFFFFF',
      headerMode: 'screen',
    });
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Image source={require('.././assets/Splash/bootsplash.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000000',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: screenHeight / 2 - 128,
    width: 256,
    height: 256,
  },
});

export default Welcome;
