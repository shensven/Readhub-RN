import React, {useLayoutEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {AxiosResponse} from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import coreColor from '../utils/coreColor';
import feedAxios from '../utils/feedAxios';
import Loading from '../animation/Loading/Loading';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const screenHeight = Dimensions.get('screen').height;

type StackParamList = {
  Params: {id: string};
  TopicDetail: {id: string};
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface IDetail {
  title: string;
  publishDate: string;
  summary: string;
  newsArray: {
    title: string;
    siteName: string;
    mobileUrl: string;
  }[];
  timeline: {
    topics: {
      id: string;
      title: string;
      createdAt: string;
    }[];
  };
}

const TopicDetail: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();
  const {id} = route.params;

  const [hasLoading, setHasloading] = useState<boolean>(true);
  const [detail, setDetail] = useState<IDetail>({
    title: '',
    publishDate: '',
    summary: '',
    newsArray: [],
    timeline: {
      topics: [],
    },
  });

  const getDetail = async () => {
    const resp: AxiosResponse = await feedAxios.get(`/topic/${id}`);
    // console.log('getDetail', resp.data);
    if (resp.status === 200) {
      setHasloading(false);
      setDetail(resp.data);
    }
  };

  useLayoutEffect(() => {
    getDetail();
  }, []);

  return (
    <ScrollView scrollIndicatorInsets={{right: 1}} contentContainerStyle={{paddingBottom: insets.bottom}}>
      {hasLoading && (
        <View style={{marginTop: screenHeight / 4}}>
          <Loading />
        </View>
      )}
      {!hasLoading && (
        <View style={{margin: 20}}>
          <Text
            selectable
            style={{fontSize: 20, fontWeight: 'bold', color: coreColor.onBackground, lineHeight: 20 * 1.5}}>
            {detail.title}
          </Text>
          {detail.publishDate.length > 0 && (
            <View
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                borderRadius: 8,
                paddingVertical: 4,
                paddingLeft: 4,
                paddingRight: 8,
                backgroundColor: coreColor.secondaryContainer,
                opacity: 0.8,
              }}>
              <Text style={{fontSize: 12}}>🕙</Text>
              <Text style={{marginLeft: 4, fontSize: 12, color: coreColor.onSecondaryContainer}}>
                {dayjs(detail.publishDate).fromNow()}
              </Text>
            </View>
          )}
          <Text
            selectable
            style={{
              marginTop: 20,
              fontSize: 16,
              textAlign: 'justify',
              lineHeight: 15 * 2,
              color: coreColor.onBackground,
            }}>
            {detail.summary}
          </Text>

          {detail.timeline?.topics.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  marginTop: 24,
                  borderRadius: 8,
                  paddingVertical: 4,
                  paddingLeft: 4,
                  paddingRight: 8,
                  backgroundColor: coreColor.secondaryContainer,
                  opacity: 0.8,
                }}>
                <Text style={{fontSize: 12}}>📰</Text>
                <Text style={{marginLeft: 4, color: coreColor.onSurfaceVariant}}>相关事件</Text>
              </View>
              <View>
                {detail.timeline.topics.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                    <Text style={{color: coreColor.onBackground}}>・</Text>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        disabled={id === item.id}
                        onPress={() => navigation.push('TopicDetail', {id: item.id})}>
                        <Text style={{fontSize: 13, lineHeight: 13 * 1.5, color: coreColor.onSecondaryContainer}}>
                          {item.title}
                          {id === item.id && <Text style={{color: coreColor.primary}}>（当前阅读）</Text>}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{marginTop: 2, fontSize: 10, color: coreColor.tertiary}}>
                        {dayjs(item.createdAt).format('YYYY-MM-DD')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {detail.newsArray?.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  marginTop: 24,
                  borderRadius: 8,
                  paddingVertical: 4,
                  paddingLeft: 4,
                  paddingRight: 8,
                  backgroundColor: coreColor.secondaryContainer,
                  opacity: 0.8,
                }}>
                <Text style={{fontSize: 12}}>🔗</Text>
                <Text style={{marginLeft: 4, color: coreColor.onSurfaceVariant}}>媒体报道</Text>
              </View>
              <View>
                {detail.newsArray.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                    <Text style={{color: coreColor.onBackground}}>・</Text>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => Linking.openURL(item.mobileUrl)}>
                        <Text style={{fontSize: 13, color: coreColor.onSecondaryContainer, lineHeight: 13 * 1.5}}>
                          {item.title + ' - '}
                          <Text style={{fontSize: 13, color: coreColor.tertiary}}>{item.siteName + ' '}</Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default TopicDetail;
