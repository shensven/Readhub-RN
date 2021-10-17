import React, {useLayoutEffect} from 'react';
import {View, Image, StyleSheet, PixelRatio, useWindowDimensions} from 'react-native';
import {Text, useTheme as usePaperTheme} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

const About: React.FC = () => {
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  const insets = useSafeAreaInsets();
  const windowHeight = useWindowDimensions().height;
  const {colors: paperColor} = usePaperTheme();

  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '关于',
      cardStyle: {backgroundColor: '#FFFFFF'},
    });
  }, [navigation, route]);

  return (
    <View style={styles.root}>
      <View style={styles.top}>
        {PixelRatio.get() === 1 && (
          <Image source={require('../assets/AppIcon/AppIcon60.png')} style={styles.app_logo} />
        )}
        {PixelRatio.get() === 2 && (
          <Image source={require('../assets/AppIcon/AppIcon120.png')} style={styles.app_logo} />
        )}
        {PixelRatio.get() === 2.75 && (
          <Image source={require('../assets/AppIcon/AppIcon165.png')} style={styles.app_logo} />
        )}
        {PixelRatio.get() === 3 && (
          <Image source={require('../assets/AppIcon/AppIcon180.png')} style={styles.app_logo} />
        )}
        <Text style={styles.app_name}>Readhub Native</Text>
        <Text style={[styles.app_ver, {color: paperColor.textAccent}]}>
          Version {version} ({buildNumber})
        </Text>
      </View>
      <View style={[styles.bottom, {marginTop: windowHeight / 2, marginBottom: insets.bottom + 24}]}>
        {/* <Text style={styles.description}>{PixelRatio.get()}</Text> */}
        <Text style={[styles.description, {color: paperColor.textAccent}]}>Made with ❤️ in Kunming by GenSven</Text>
        <Text style={[styles.description, {color: paperColor.textAccent}]}>Thanks to readhub.cn</Text>
        <Text style={[styles.description, {color: paperColor.textAccent}]}>Powered by React Native</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  top: {
    alignItems: 'center',
  },
  app_logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 48,
  },
  app_name: {
    marginTop: 16,
  },
  app_ver: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  bottom: {
    alignItems: 'center',
  },
  description: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default About;
