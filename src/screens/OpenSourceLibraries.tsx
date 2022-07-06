import React from 'react';
import {Linking, View} from 'react-native';
import {List, Text, TouchableRipple} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IcRoundOpenInNew from '../icons/IcRoundOpenInNew';
import coreColor from '../utils/coreColor';

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
  const insets = useSafeAreaInsets();

  const renderTouchableRipple = ({item}: {item: TouchableRippleItem}) => {
    return (
      <TouchableRipple onPress={() => Linking.openURL(item.repository)}>
        <List.Item
          title={item.name}
          titleStyle={{fontSize: 12, color: coreColor.onBackground}}
          right={() => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12, marginRight: 8, color: coreColor.primary}}>{item.license}</Text>
              <IcRoundOpenInNew size={12} color={coreColor.secondary} />
            </View>
          )}
        />
      </TouchableRipple>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderTouchableRipple}
      keyExtractor={item => item.name}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{height: insets.bottom}}
    />
  );
};

export default OpenSourceLibraries;
