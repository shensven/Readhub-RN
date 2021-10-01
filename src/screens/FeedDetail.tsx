import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appAxios from '../utils/appAxios';

type StackParamList = {
  Params: {
    id: string;
  };
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

interface InstantDetail {
  content: string;
  siteName: string;
  title: string;
  url: string;
}

const FeedDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

  const [instantDetail, setInstantDetail] = useState<InstantDetail>();

  const getInstantDetail = async () => {
    const resp: any = await appAxios.get(
      'https://api.readhub.cn/topic/instantview',
      {
        params: {
          topicId: route.params.id,
        },
      },
    );
    // console.log('getInstantDetail', resp.data);
    setInstantDetail(resp.data);
  };

  useLayoutEffect(() => {
    getInstantDetail();
  }, [navigation, route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '话题详情',
    });
  }, [navigation, route]);

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View>
        <Text style={styles.title}>{instantDetail?.title}</Text>
        <Text style={styles.content}>{instantDetail?.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {},
});

export default FeedDetail;
