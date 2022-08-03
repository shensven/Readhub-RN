import React, {useLayoutEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Linking} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, useTheme} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {AxiosResponse} from 'axios';
import dayjs from 'dayjs';
import color from 'color';
import relativeTime from 'dayjs/plugin/relativeTime';
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

  const {colors} = useTheme();

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
          <Text selectable style={{fontSize: 20, fontWeight: 'bold', color: colors.onBackground, lineHeight: 20 * 1.5}}>
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
                backgroundColor: color(colors.secondary).alpha(0.12).toString(),
                opacity: 0.8,
              }}>
              <Text style={{fontSize: 12, includeFontPadding: false}}>🕙</Text>
              <Text
                style={{
                  marginLeft: 4,
                  fontSize: 12,
                  color: color(colors.onSurface).alpha(0.8).toString(),
                  includeFontPadding: false,
                }}>
                {dayjs(detail.publishDate).fromNow()}
              </Text>
            </View>
          )}
          <Text
            selectable
            style={{marginTop: 20, fontSize: 16, textAlign: 'justify', lineHeight: 15 * 2, color: colors.onBackground}}>
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
                  backgroundColor: color(colors.secondary).alpha(0.12).toString(),
                  opacity: 0.8,
                }}>
                <Text style={{fontSize: 12, includeFontPadding: false}}>📰</Text>
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: color(colors.onSurface).alpha(0.8).toString(),
                    includeFontPadding: false,
                  }}>
                  相关事件
                </Text>
              </View>
              <View>
                {detail.timeline.topics.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                    <Text style={{color: color(colors.onBackground).alpha(0.8).toString()}}>・</Text>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        disabled={id === item.id}
                        onPress={() => navigation.push('TopicDetail', {id: item.id})}>
                        <Text
                          style={{
                            fontSize: 13,
                            lineHeight: 13 * 1.5,
                            color: color(colors.onBackground).alpha(0.8).toString(),
                          }}>
                          {item.title}
                          {id === item.id && <Text style={{color: colors.primary}}>（当前阅读）</Text>}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 2,
                          fontSize: 10,
                          color: color(colors.onBackground).alpha(0.5).toString(),
                        }}>
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
                  backgroundColor: color(colors.secondary).alpha(0.12).toString(),
                  opacity: 0.8,
                }}>
                <Text style={{fontSize: 12, includeFontPadding: false}}>🔗</Text>
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 12,
                    color: color(colors.onSurface).alpha(0.8).toString(),
                    includeFontPadding: false,
                  }}>
                  媒体报道
                </Text>
              </View>
              <View>
                {detail.newsArray.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                    <Text style={{color: color(colors.onBackground).alpha(0.8).toString()}}>・</Text>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => Linking.openURL(item.mobileUrl)}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: color(colors.onBackground).alpha(0.8).toString(),
                            lineHeight: 13 * 1.5,
                          }}>
                          {item.title + ' - '}
                          <Text
                            style={{
                              fontSize: 13,
                              color: color(colors.onBackground).alpha(0.8).toString(),
                            }}>
                            {item.siteName + ' '}
                          </Text>
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
