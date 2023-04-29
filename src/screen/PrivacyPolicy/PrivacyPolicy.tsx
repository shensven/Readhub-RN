import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppearance} from '@/utils/appearance';

function PrivacyPolicy() {
  const {colors} = useAppearance().paperTheme;

  return (
    <ScrollView>
      <View style={{margin: 16}}>
        <Text style={{lineHeight: 14 * 1.7, textAlign: 'justify', color: colors.onBackground}}>
          SvenFE（下称我们）实现的 Readhub
          版本十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，所有的网络请求活动均只用于前端交互。
        </Text>
      </View>
    </ScrollView>
  );
}

export default PrivacyPolicy;
