import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

const SearchHeaderRight: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
      style={styles.RNHeader_right}
      onPress={() => navigation.goBack()}>
      <Text>取消</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  RNHeader_right: {
    width: screenWidth * 0.15,
    alignItems: 'center',
  },
});

export default SearchHeaderRight;
