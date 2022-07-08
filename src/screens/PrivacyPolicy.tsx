import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import coreColor from '../utils/coreColor';

const PrivacyPolicy: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <Text style={{lineHeight: 24, textAlign: 'justify', color: coreColor.onBackground}}>
        SvenFE（下称我们）实现的 Readhub
        版本十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，所有的网络请求活动均只用于前端交互。
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;
