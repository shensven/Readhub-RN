import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';

const Search: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '搜索',
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>search</Text>
    </View>
  );
};

export default Search;
