import React from 'react';
import {Linking, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import color from 'color';
import {IcRoundOpenInNew} from '@/component/Icon';
import Item from './Item';

type LicenseCompliance = {
  license: string;
  licenseFile: string;
  name: string;
  path: string;
  repository: string;
  version: string;
};

type RenderItemProps = {
  name: LicenseCompliance['name'];
  license: LicenseCompliance['license'];
  repository: LicenseCompliance['repository'];
};

const data: LicenseCompliance[] = require('./licenseCompliance.json');

function OpenSourceLibraries() {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  const renderItem = ({item}: {item: RenderItemProps}) => {
    return (
      <Item
        name={item.name}
        license={item.license}
        rightIcon={<IcRoundOpenInNew width={14} height={14} color={color(colors.onBackground).alpha(0.7).hexa()} />}
        onPress={() => Linking.openURL(item.repository)}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name + index}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{height: insets.bottom}}
    />
  );
}

export default OpenSourceLibraries;
