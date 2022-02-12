import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {List, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IcRoundOpenInNew from '../icons/IcRoundOpenInNew';

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
  const {colors} = useTheme();

  const renderTouchableRipple = ({item}: {item: TouchableRippleItem}) => {
    return (
      <TouchableRipple rippleColor={colors.ripple} style={styles.root} onPress={() => Linking.openURL(item.repository)}>
        <List.Item
          title={item.name}
          titleStyle={styles.title}
          right={() => (
            <View style={styles.right}>
              <Text style={[styles.license, {color: colors.textAccent}]}>{item.license}</Text>
              <IcRoundOpenInNew size={12} />
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
      ListFooterComponentStyle={[{height: insets.bottom}, styles.listFooter]}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 12,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  license: {
    fontSize: 12,
    marginRight: 8,
  },
  icon: {
    marginLeft: 8,
  },
  listFooter: {
    backgroundColor: '#FFF',
  },
});

export default OpenSourceLibraries;
