import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {List} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import Item from './Item';
import type {ItemProps} from './Item';
import useData from './useData';

function Settings() {
  const insets = useSafeAreaInsets();
  const data = useData();

  const renderItem = ({item}: {item: ItemProps}) => {
    return (
      <Item
        title={item.title}
        leftIcon={<List.Icon icon={() => item.leftIcon} />}
        rightIcon={<List.Icon icon={() => item.rightIcon} />}
        onPress={item.onPress}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.title + index}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{height: insets.bottom}}
    />
  );
}

export default Settings;
