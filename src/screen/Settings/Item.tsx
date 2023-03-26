import React from 'react';
import {View} from 'react-native';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';

type ItemProps = {
  title: string;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  onPress: () => void;
};

function Item(props: ItemProps) {
  const {title, leftIcon, rightIcon, onPress} = props;
  const {colors} = useTheme();

  return (
    <TouchableRipple style={{paddingHorizontal: 16, paddingVertical: 20}} onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {leftIcon}
          <Text variant="titleMedium" style={{marginLeft: 16, color: colors.onBackground}}>
            {title}
          </Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', width: 24}}>{rightIcon}</View>
      </View>
    </TouchableRipple>
  );
}

export default Item;
export type {ItemProps};
