import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const Help: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '帮助',
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>help</Text>
    </View>
  );
};

export default Help;
