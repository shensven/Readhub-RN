import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity, Linking} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import appAxios from '../utils/appAxios';
import {Detail, NewsArray, Topics} from '../utils/type';

type StackParamList = {
  Params: {id: string};
  Instant: {id: string};
  DetailTopic: {id: string};
};

type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const DetailTopic: React.FC = () => {
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const {id} = route.params;

  const [hasFinalView, setHasFinalView] = useState<boolean>(false);
  const [detail, setDetail] = useState<Detail>({} as Detail);

  const getTopicSummary = async () => {
    const resp: {data: Detail} = await appAxios.get(`/topic/${route.params.id}`);
    // console.log('getTopicSummary', resp.data);
    setDetail(resp.data);
    setHasFinalView(true);
  };

  useLayoutEffect(() => {
    getTopicSummary();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '话题详情',
      cardStyle: {backgroundColor: '#FFFFFF'},
    });
  }, [navigation, route]);

  switch (hasFinalView) {
    case true:
      return (
        hasFinalView && (
          <ScrollView contentContainerStyle={styles.root}>
            <Text style={styles.title}>{detail.title}</Text>
            <Text style={styles.publishDate}>{dayjs(detail.publishDate).fromNow()}</Text>
            <Text selectable={true} style={styles.summary}>
              {detail.summary}
            </Text>
            <View style={styles.mid}>
              {detail.hasInstantView ? (
                <TouchableRipple
                  borderless={true}
                  rippleColor="rgba(46,117,213,0.8)"
                  style={styles.instant}
                  onPress={() => navigation.navigate('Instant', {id})}>
                  <>
                    <Ionicons name="glasses-outline" size={24} color="rgb(46,117,213)" />
                    <Text style={styles.instant_label}>即时预览</Text>
                  </>
                </TouchableRipple>
              ) : (
                <View />
              )}
              <IconButton icon="share-variant" size={14} color="#FFFFFF" style={styles.iconbtn} onPress={() => {}} />
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottom_title}>
                <Ionicons name="newspaper-outline" size={16} />
                <Text style={styles.bottom_title_right}>媒体报道</Text>
              </View>
              {detail?.newsArray?.map((newsReporterItem: NewsArray, newsReporterIndex: number) => (
                <View key={newsReporterIndex} style={styles.bottom_item}>
                  <Text>・</Text>
                  <View>
                    <TouchableOpacity onPress={() => Linking.openURL(newsReporterItem.mobileUrl)}>
                      <Text>{newsReporterItem.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottom_subTitle}>{newsReporterItem.siteName}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottom_title}>
                <Ionicons name="time-outline" size={17} />
                <Text style={styles.bottom_title_right}>事件追踪</Text>
              </View>
              {detail?.timeline?.topics?.map((topicsItem: Topics, topicIndex: number) => (
                <View key={topicIndex} style={styles.bottom_item}>
                  <Text>・</Text>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if (detail.id !== topicsItem.id) {
                          navigation.push('DetailTopic', {id: topicsItem.id});
                        }
                      }}>
                      <Text>{topicsItem.title}</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottom_subTitle}>{dayjs(topicsItem.createdAt).format('YYYY-MM-DD')}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )
      );
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  root: {
    padding: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 27,
    textAlign: 'justify',
  },
  publishDate: {
    marginTop: 8,
  },
  summary: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 32,
    textAlign: 'justify',
  },
  mid: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instant: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46,117,213,0.1)',
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  instant_label: {
    includeFontPadding: false,
    marginLeft: 4,
    color: 'rgb(46,117,213)',
  },
  iconbtn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingRight: 2,
  },
  bottom: {
    marginTop: 24,
  },
  bottom_item: {
    marginTop: 16,
    flexDirection: 'row',
  },
  bottom_title: {
    flexDirection: 'row',
    alignItems: 'center',
    includeFontPadding: false,
  },
  bottom_title_right: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  bottom_subTitle: {
    fontSize: 10,
    marginTop: 2,
    opacity: 0.5,
  },
});

export default DetailTopic;
