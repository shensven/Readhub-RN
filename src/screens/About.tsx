import React, {useLayoutEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

const About: React.FC = () => {
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  const insets = useSafeAreaInsets();

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
        <Image source={require('../assets/AppIcon/AppIcon120.png')} style={styles.app_logo} />
        <Text style={styles.app_name}>ReadHub Native</Text>
        <Text style={styles.app_ver}>
          Version {version} ({buildNumber})
        </Text>
      </View>
      {/* <Text style={[styles.description, {marginBottom: insets.bottom + 24}]}>Made with ❤️ in Kunming by GenSven</Text> */}
      <Text style={[styles.description, {marginBottom: insets.bottom + 24}]}>Made with ❤️ in Kunming by GenSven</Text>
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
  description: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default About;
