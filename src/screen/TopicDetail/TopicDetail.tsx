import React, {useLayoutEffect, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Linking, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text} from 'react-native-paper';
import {AxiosResponse} from 'axios';
import {useRequest} from 'ahooks';
import color from 'color';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Loading from '@/animation/Loading/Loading';
import feedAxios from '@/utils/feedAxios';
import {useAppearance} from '@/utils/appearance';

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

function TopicDetail() {
  const insets = useSafeAreaInsets();
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();

  const {id} = route.params;

  const {colors} = useAppearance().paperTheme;

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
      setDetail(resp.data);
    }
  };

  const {loading} = useRequest(getDetail, {
    loadingDelay: 300,
  });

  useLayoutEffect(() => {
    getDetail();
  }, []);

  return (
    <ScrollView>
      {loading && (
        <View style={{marginTop: screenHeight / 4}}>
          <Loading />
        </View>
      )}
      {!loading && (
        <View style={{marginHorizontal: 16, marginTop: 16, marginBottom: 16 + insets.bottom}}>
          <Text
            selectable
            style={{
              marginHorizontal: 2,
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.onBackground,
              lineHeight: 20 * 1.5,
            }}>
            {detail.title}
          </Text>
          {detail.publishDate.length > 0 && (
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                height: 24,
                marginTop: 12,
                paddingHorizontal: 8,
                borderRadius: 8,
                backgroundColor: color(colors.secondaryContainer).alpha(0.5).hexa(),
              }}>
              <Text style={{fontSize: 12, includeFontPadding: false, marginLeft: -2}}>🕙</Text>
              <Text
                style={{
                  fontSize: 12,
                  includeFontPadding: false,
                  marginLeft: 4,
                  color: color(colors.onSecondaryContainer).alpha(0.5).hexa(),
                }}>
                {dayjs(detail.publishDate).fromNow()}
              </Text>
            </View>
          )}
          <Text
            selectable
            style={{
              marginTop: 12,
              marginHorizontal: 2,
              fontSize: 16,
              textAlign: 'justify',
              lineHeight: 15 * 2,
              color: colors.onBackground,
            }}>
            {detail.summary}
          </Text>

          {detail.timeline?.topics.length > 0 && (
            <>
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 24,
                  marginTop: 24,
                  paddingHorizontal: 8,
                  borderRadius: 8,
                  backgroundColor: color(colors.secondaryContainer).alpha(0.5).hexa(),
                }}>
                <Text style={{fontSize: 12, includeFontPadding: false, marginLeft: -2}}>📰</Text>
                <Text
                  style={{
                    fontSize: 12,
                    includeFontPadding: false,
                    marginLeft: 4,
                    color: color(colors.onSecondaryContainer).alpha(0.5).hexa(),
                  }}>
                  相关事件
                </Text>
              </View>
              <View>
                {detail.timeline.topics.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                    <Text style={{color: colors.tertiary}}>・</Text>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        disabled={id === item.id}
                        onPress={() => navigation.push('TopicDetail', {id: item.id})}>
                        <Text style={{fontSize: 13, lineHeight: 13 * 1.5, color: colors.tertiary}}>
                          {item.title}
                          {id === item.id && <Text style={{color: colors.primary}}>（当前阅读）</Text>}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginTop: 2,
                          fontSize: 10,
                          color: color(colors.onBackground).alpha(0.5).hexa(),
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
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 24,
                  marginTop: 24,
                  paddingHorizontal: 8,
                  borderRadius: 8,
                  backgroundColor: color(colors.secondaryContainer).alpha(0.5).hexa(),
                }}>
                <Text style={{fontSize: 12, includeFontPadding: false, marginLeft: -2}}>🔗</Text>
                <Text
                  style={{
                    fontSize: 12,
                    includeFontPadding: false,
                    marginLeft: 4,
                    color: color(colors.onSecondaryContainer).alpha(0.5).hexa(),
                  }}>
                  媒体报道
                </Text>
              </View>
              <View>
                {detail.newsArray.map((item, index) => (
                  <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                    <Text style={{color: colors.tertiary}}>・</Text>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress={() => Linking.openURL(item.mobileUrl)}>
                        <Text style={{fontSize: 13, lineHeight: 13 * 1.5, color: colors.tertiary}}>
                          {item.title + ' - '}
                          <Text style={{fontSize: 13, color: colors.tertiary}}>{item.siteName + ' '}</Text>
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
}

export default TopicDetail;
