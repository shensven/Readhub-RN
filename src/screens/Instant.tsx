import React, {useLayoutEffect, useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import appAxios from '../utils/appAxios';

type StackParamList = {
  Params: {
    id: string;
    title: string;
    summary: string;
    publishDate: string;
  };
};

type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

interface InstantDetail {
  content: string;
  siteName: string;
  title: string;
  url: string;
}

const Instant: React.FC = () => {
  const {width} = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

  const [instantDetail, setInstantDetail] = useState<InstantDetail>({
    content: '',
    siteName: '',
    title: '',
    url: '',
  });

  const getInstantDetail = async () => {
    const resp: any = await appAxios.get('https://api.readhub.cn/topic/instantview', {
      params: {
        topicId: route.params.id,
      },
    });
    console.log('getInstantDetail', resp.data);
    setInstantDetail(resp.data);
  };

  useLayoutEffect(() => {
    getInstantDetail();
  }, [navigation, route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '即时预览',
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [navigation, route]);

  return (
    <View>
      <Text>Instant</Text>
      <RenderHtml contentWidth={width - 32} source={{html: instantDetail.content}} />
    </View>
  );
};

export default Instant;
