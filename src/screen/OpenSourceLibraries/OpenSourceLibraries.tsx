import React from 'react';
import {Linking, View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IcRoundOpenInNew} from '@/component/Icon';
import {useAppearance} from '@/utils/appearance';
import color from 'color';
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
  const {paperTheme} = useAppearance();

  const renderItem = ({item}: {item: RenderItemProps}) => {
    return (
      <Item
        name={item.name}
        license={item.license}
        rightIcon={
          <IcRoundOpenInNew width={14} height={14} color={color(paperTheme.colors.onBackground).alpha(0.7).hexa()} />
        }
        onPress={() => Linking.openURL(item.repository)}
      />
    );
  };

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={40}
      keyExtractor={(item, index) => item.name + index}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{height: insets.bottom}}
    />
  );
}

export default OpenSourceLibraries;
