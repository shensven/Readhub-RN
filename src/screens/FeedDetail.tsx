import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import appAxios from '../utils/appAxios';

type StackParamList = {
  Params: {
    id: string;
  };
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

const FeedDetail: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

  const getInstantDetail = async () => {
    const resp: any = await appAxios.get(
      'https://api.readhub.cn/topic/instantview',
      {
        params: {
          topicId: route.params.id,
        },
      },
    );
    console.log(resp.data);
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
      <Text>detail</Text>
    </View>
  );
};

export default FeedDetail;
