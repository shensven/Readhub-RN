import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import {useAppearance} from '@/utils/appearance';
import color from 'color';

declare const global: {
  HermesInternal: null | {
    getRuntimeProperties: () => {
      'OSS Release Version': string;
    };
  };
};

function Aouut() {
  const insets = useSafeAreaInsets();
  const {colors} = useAppearance().paperTheme;

  const hermeVersion = global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'] ?? '';

  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  return (
    <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('@/assets/appIcon/AppIconAlpha.png')}
          style={{width: 90, height: 90, marginTop: 40, marginBottom: 8}}
        />

        <Text variant="titleMedium" style={{color: colors.primary}}>
          SvenFE implementation of Readhub
        </Text>
        <Text variant="bodySmall" style={{color: colors.onBackground, fontSize: 10}}>
          Version {version} ({buildNumber})
        </Text>
      </View>
      <View style={{alignItems: 'center', paddingBottom: 48}}>
        <Text variant="bodySmall" style={{color: colors.onPrimaryContainer, fontSize: 10}}>
          Made with ❤️ in Kunming by SvenFE
        </Text>
        <Text variant="bodySmall" style={{color: color(colors.onBackground).alpha(0.5).hexa(), marginTop: 8}}>
          Engine: Hermes {hermeVersion}
        </Text>
      </View>
    </View>
  );
}

export default Aouut;
