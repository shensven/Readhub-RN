import React, {useEffect, useState} from 'react';
import {View, ListRenderItem, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import color from 'color';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {AxiosResponse} from 'axios';
import feedAxios from '../utils/feedAxios';
import IcRoundShare from '../assets/icons/IcRoundShare';
import Loading from '../animation/Loading/Loading';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

type StackParamList = {
  TopicDetail: {id: string};
  StockFileDetail: {id: string};
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface TopicsFeed {
  createdAt: string;
  eventData: {
    createdAt: string;
    entityId: string;
    entityName: string;
    entityType: string;
    eventType: number;
    id: number;
    state: number;
    topicId: string;
    updatedAt: string;
  }[];
  extra: {
    instantView: boolean;
  };
  hasInstantView: boolean;
  id: string;
  newsArray: {
    autherName: string;
    duplicateId: 1;
    hasInstantView: boolean;
    id: number;
    language: string;
    mobileUrl: string;
    publishDate: string;
    siteName: string;
    statementType: number;
    title: string;
    url: string;
  }[];
  order: number;
  publishDate: string;
  summary: string;
  timeline: string;
  title: string;
  updatedAt: string;
}

const Home: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const {colors} = useTheme();

  const [topics, setTopics] = useState<TopicsFeed[]>([]);
  const [topicLastCursor, setTopicLastCursor] = useState<number | undefined>(undefined);
  const [topicRefreshing, setTopicRefreshing] = useState<boolean>(false);

  const getTopics = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await feedAxios.get('/topic', {params: {pageSize: 20}});
    setTopics(resp.data.data);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const getNextTopic = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await feedAxios.get('/topic', {
      params: {pageSize: 20, lastCursor: topicLastCursor},
    });
    setTopics([...topics, ...resp.data.data]);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const handleTopicRefresh = () => {
    setTopicRefreshing(true);
    setTopicLastCursor(undefined);
    getTopics();
    setTopicRefreshing(false);
  };

  useEffect(() => {
    getTopics();
  }, []);

  const renderTopicItem: ListRenderItem<TopicsFeed> = ({item}) => {
    return (
      <TouchableRipple
        borderless
        style={{
          marginLeft: 16,
          marginRight: 16,
          padding: 16,
          borderRadius: 16,
          backgroundColor: color(colors.secondary).alpha(0.12).toString(),
        }}
        onPress={() => navigation.navigate('TopicDetail', {id: item.id})}>
        <>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'justify',
              lineHeight: 18 * 1.5,
              color: color(colors.onSurface).alpha(0.9).toString(),
            }}>
            {item.title}
          </Text>
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: colors.surface,
              borderRadius: 8,
              paddingVertical: 4,
              paddingLeft: 4,
              paddingRight: 8,
              opacity: 0.8,
            }}>
            <Text style={{fontSize: 12, includeFontPadding: false}}>🕙</Text>
            <Text
              style={{
                marginLeft: 4,
                fontSize: 12,
                includeFontPadding: false,
                color: colors.secondary,
              }}>
              {dayjs(item.publishDate).fromNow()}
            </Text>
          </View>
          <Text
            numberOfLines={5}
            style={{
              marginTop: 16,
              fontSize: 15,
              textAlign: 'justify',
              lineHeight: 15 * 1.8,
              color: color(colors.onSurface).alpha(0.8).toString(),
            }}>
            {item.summary}
          </Text>
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              opacity: 0.8,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: colors.surface,
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}>
              {item.newsArray.length === 1 && (
                <Text style={{fontSize: 12, color: colors.secondary}}>{item.newsArray[0].siteName + ' 报道'}</Text>
              )}
              {item.newsArray.length > 1 && (
                <Text style={{fontSize: 12, color: colors.secondary}}>
                  {item.newsArray[0].siteName + ' 等 ' + item.newsArray.length + ' 家媒体报道'}
                </Text>
              )}
            </View>
            <TouchableRipple
              borderless
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 2,
                backgroundColor: colors.secondary,
              }}
              onPress={() => {}}>
              <IcRoundShare size={14} color={colors.onSecondary} />
            </TouchableRipple>
          </View>
        </>
      </TouchableRipple>
    );
  };

  return (
    <FlatList
      data={topics}
      renderItem={renderTopicItem}
      ListHeaderComponent={<View />}
      ListHeaderComponentStyle={{height: 16}}
      ListFooterComponent={<Loading />}
      ListFooterComponentStyle={{marginTop: 24, marginBottom: 24 + insets.bottom}}
      ItemSeparatorComponent={() => <View style={{height: 16}} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onEndReached={() => getNextTopic()}
      refreshControl={<RefreshControl refreshing={topicRefreshing} onRefresh={() => handleTopicRefresh()} />}
    />
  );
};

export default Home;
