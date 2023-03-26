import React from 'react';
import {View} from 'react-native';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';

type ItemProps = {
  name: string;
  license: string;
  rightIcon: React.ReactNode;
  onPress: () => void;
};

function Item(props: ItemProps) {
  const {name, license, rightIcon, onPress} = props;
  const {colors} = useTheme();

  return (
    <TouchableRipple style={{paddingHorizontal: 16, paddingVertical: 12}} onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text variant="bodySmall" style={{color: colors.onBackground}}>
          {name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text variant="labelSmall" style={{marginLeft: 16, color: colors.primary}}>
            {license}
          </Text>
          <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 8}}>{rightIcon}</View>
        </View>
      </View>
    </TouchableRipple>
  );
}

export default Item;
export type {ItemProps};
