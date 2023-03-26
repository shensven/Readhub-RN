import React from 'react';
import {Dimensions, View} from 'react-native';
import {Avatar, Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

declare const global: {
  HermesInternal: null | {
    getRuntimeProperties: () => {
      'OSS Release Version': string;
    };
  };
};

const screenHeight = Dimensions.get('screen').height;

function Aouut() {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  const hermeVersion = global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'] ?? '';

  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  return (
    <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom}}>
      <View style={{alignItems: 'center', height: screenHeight * 0.75}}>
        <Avatar.Image
          size={68}
          source={require('@/assets/appIcon/AppIconAlpha.png')}
          style={{marginTop: 40, marginBottom: 8}}
          theme={{
            colors: {primary: 'transparent'},
          }}
        />
        <Text variant="titleMedium" style={{color: colors.primary}}>
          SvenFE implementation of Readhub
        </Text>
        <Text variant="bodySmall" style={{fontWeight: 'bold', color: colors.secondary, marginTop: 4}}>
          Version {version} ({buildNumber})
        </Text>
      </View>
      <View style={{alignItems: 'center', marginBottom: 8}}>
        <Text
          variant="labelSmall"
          style={{color: colors.onBackground, marginTop: 8}}>{`Engine: Hermes ${hermeVersion}`}</Text>
      </View>
    </View>
  );
}

export default Aouut;
