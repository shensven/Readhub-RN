import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const About: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '关于',
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>about</Text>
    </View>
  );
};

export default About;
