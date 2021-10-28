import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const PrivacyPolicy: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.description}>
        我们 (Readhub Native)
        十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，所有的网络请求活动均只用于前端交互。
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

export default PrivacyPolicy;
