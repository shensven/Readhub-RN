import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

interface Item {
  title: string;
  leftIcon: string;
  leftIconSize?: number;
  rightIcon: string;
  onPress: () => void;
}

const Help: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '隐私政策',
      cardStyle: {backgroundColor: '#FFFFFF'},
    });
  }, [navigation, route]);

  return (
    <View style={styles.root}>
      <Text style={styles.description}>
        我们十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，所有的网络请求活动均只用于接收数据。
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 8,
  },
  description: {
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default Help;
