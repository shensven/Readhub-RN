import React from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BlurScrollView from './components/BlurScrollView';

const PrivacyPolicy: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <BlurScrollView>
      <View style={{marginHorizontal: 16, marginTop: 16, marginBottom: 16 + insets.bottom}}>
        <Text style={{lineHeight: 14 * 1.7, textAlign: 'justify', color: colors.onBackground}}>
          SvenFE（下称我们）实现的 Readhub
          版本十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，所有的网络请求活动均只用于前端交互。
        </Text>
      </View>
    </BlurScrollView>
  );
};

export default PrivacyPolicy;
