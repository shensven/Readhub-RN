import React from 'react';
import {View, FlatList, StyleSheet, Linking} from 'react-native';
import {List, Text, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from './components/FocusAwareStatusBar/FocusAwareStatusBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface PackageDetail {
  department: string;
  relatedTo: string;
  name: string;
  licensePeriod: string;
  material: string;
  licenseType: string;
  link: string;
  remoteVersion: string;
  installedVersion: string;
  author: string;
}

interface TouchableRippleProps {
  link: string;
  name: string;
  licenseType: string;
}

const openSourceLibrariesArr: PackageDetail[] = require('./../utils/openSourceLibraries.json');

const OpenSourceLibraries: React.FC = () => {
  const {colors: paperColor} = usePaperTheme();
  const insets = useSafeAreaInsets();

  const renderTouchableRipple = ({item}: {item: TouchableRippleProps}) => {
    return (
      <TouchableRipple
        rippleColor={paperColor.ripple}
        style={[styles.item_btn, {backgroundColor: paperColor.cardBackground}]}
        onPress={() => Linking.openURL('https://' + item.link.split('//')[1])}>
        <List.Item
          title={item.name}
          titleStyle={[styles.item_title, {color: paperColor.text}]}
          right={() => (
            <View style={styles.item_right}>
              <Text style={[styles.item_right_type, {color: paperColor.placeholder}]}>
                {item.licenseType ?? 'UNKNOWN'}
              </Text>
              <Ionicons name="open-outline" size={12} color={paperColor.text} />
            </View>
          )}
        />
      </TouchableRipple>
    );
  };

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <FlatList
        data={openSourceLibrariesArr}
        renderItem={renderTouchableRipple}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <View />}
        ListFooterComponentStyle={{height: insets.bottom}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item_btn: {},
  item_title: {
    fontSize: 12,
    marginRight: 16,
  },
  item_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_right_type: {
    fontSize: 12,
    marginRight: 4,
  },
});

export default OpenSourceLibraries;
