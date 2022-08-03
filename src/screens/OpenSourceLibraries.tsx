import React from 'react';
import {Linking, NativeModules, Platform, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import {List, Text, TouchableRipple, useTheme} from 'react-native-paper';
import color from 'color';
import IcRoundOpenInNew from '../assets/icons/IcRoundOpenInNew';
import useColorSystem from '../utils/useColorSystem';

interface PackageDetail {
  license: string;
  licenseFile: string;
  name: string;
  path: string;
  repository: string;
  version: string;
}

interface TouchableRippleItem {
  name: string;
  license: string;
  repository: string;
}

const data: PackageDetail[] = require('../assets/openSourceLibraries/licenseCompliance.json');

const OpenSourceLibraries: React.FC = () => {
  const {StatusBarManager} = NativeModules;
  const statusBarHeight = StatusBarManager.HEIGHT;

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const {colors} = useTheme();
  const {headerBlurType} = useColorSystem();

  const renderTouchableRipple = ({item}: {item: TouchableRippleItem}) => {
    return (
      <TouchableRipple onPress={() => Linking.openURL(item.repository)}>
        <List.Item
          title={item.name}
          titleStyle={{fontSize: 12, color: colors.onBackground}}
          right={() => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, marginRight: 8, color: colors.primary}}>{item.license}</Text>
              <IcRoundOpenInNew size={12} color={color(colors.onBackground).alpha(0.7).toString()} />
            </View>
          )}
        />
      </TouchableRipple>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderTouchableRipple}
        keyExtractor={item => item.name}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{height: insets.bottom}}
        scrollIndicatorInsets={{top: headerHeight - statusBarHeight}}
        style={{paddingTop: Platform.OS === 'ios' ? headerHeight : 0}}
      />
      {Platform.OS === 'ios' && (
        <BlurView
          blurType={headerBlurType}
          blurAmount={16}
          style={{width: '100%', height: headerHeight, position: 'absolute', top: 0}}
        />
      )}
    </View>
  );
};

export default OpenSourceLibraries;
