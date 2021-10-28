import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton, useTheme as usePaperTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const HomeHeaderRight: React.FC = () => {
  const {colors: paperColor} = usePaperTheme();
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={styles.RNHeader_right}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.RNHeader_fakeinput, {backgroundColor: paperColor.rippleAccent}]}
        onPress={() => navigation.navigate('Search')}>
        <Text style={[styles.RNHeader_fakeinput_placeholder, {color: paperColor.textAccent}]}>搜索</Text>
        <Ionicons
          name="search-outline"
          size={16}
          color={paperColor.textAccent}
          style={styles.RNHeader_fakeinput_icon}
        />
      </TouchableOpacity>
      <IconButton
        icon={() => <Ionicons name="cog-outline" size={24} />}
        rippleColor={paperColor.ripple}
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  RNHeader_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RNHeader_fakeinput: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  RNHeader_fakeinput_placeholder: {
    paddingLeft: 8,
    paddingRight: 0,
    marginRight: 32,
  },
  RNHeader_fakeinput_icon: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default HomeHeaderRight;
