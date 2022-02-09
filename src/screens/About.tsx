import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Avatar, Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenHeight = Dimensions.get('screen').height;

const Aouut: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <View style={[styles.root, {paddingBottom: insets.bottom}]}>
      <View style={styles.top}>
        <Avatar.Image
          size={68}
          source={require('../assets/appIcon/AppIcon_alpha.png')}
          style={styles.appIcon}
          theme={{
            colors: {
              primary: 'transparent',
            },
          }}
        />
        <Text style={styles.appName}>Readhub Native</Text>
        <Text style={[styles.appVersion, {color: colors.textAccent}]}>Version 2.0.0-rc (1)</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.closingWords}>Made with ❤️ in Kunming by @SvenFE</Text>
        <Text style={[styles.closingWords, {color: colors.textAccent}]}>Salute to readhub.cn</Text>
        <Text style={[styles.closingWords, {color: colors.textAccent}]}>Powered by React Native</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  top: {
    alignItems: 'center',
    height: screenHeight * 0.75,
  },
  appIcon: {
    marginTop: 40,
    marginBottom: 8,
  },
  appName: {
    fontWeight: 'bold',
  },
  appVersion: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  bottom: {
    alignItems: 'center',
    marginBottom: 8,
  },
  closingWords: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default Aouut;
