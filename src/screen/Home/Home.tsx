import React, {useCallback, useEffect, useState} from 'react';
import {View, ListRenderItem, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import type {AxiosResponse} from 'axios';
import feedAxios from '@/utils/feedAxios';
import Loading from '@/animation/Loading/Loading';
import TopicCard from './TopicCard';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

type StackParamList = {
  TopicDetail: {id: string};
  StockFileDetail: {id: string};
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

export type Feed = {
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
};

function Home() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const [topics, setTopics] = useState<Feed[]>([]);
  const [topicLastCursor, setTopicLastCursor] = useState<number | undefined>(undefined);
  const [topicRefreshing, setTopicRefreshing] = useState<boolean>(false);

  const getFeed = async () => {
    const resp: AxiosResponse<{data: Feed[]}> = await feedAxios.get('/topic', {params: {pageSize: 20}});
    setTopics(resp.data.data);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const getNextTopic = async () => {
    const resp: AxiosResponse<{data: Feed[]}> = await feedAxios.get('/topic', {
      params: {pageSize: 20, lastCursor: topicLastCursor},
    });
    setTopics([...topics, ...resp.data.data]);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const handleTopicRefresh = () => {
    setTopicRefreshing(true);
    setTopicLastCursor(undefined);
    getFeed();
    setTopicRefreshing(false);
  };

  useEffect(() => {
    getFeed();
  }, []);

  const renderItem: ListRenderItem<Feed> = ({item}) => {
    return (
      <TopicCard
        title={item.title}
        publishDate={dayjs(item.publishDate).fromNow()}
        summary={item.summary}
        newsArray={item.newsArray}
        onPress={() => navigation.navigate('TopicDetail', {id: item.id})}
      />
    );
  };

  const ItemSeparatorComponent = useCallback(() => <View style={{height: 16}} />, []);

  return (
    <FlatList
      data={topics}
      extraData={topics}
      renderItem={renderItem}
      ListHeaderComponent={<View />}
      ListHeaderComponentStyle={{height: 16}}
      ListFooterComponent={<Loading />}
      ListFooterComponentStyle={{marginTop: 24, marginBottom: 24 + insets.bottom}}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={item => item.id}
      onEndReached={() => getNextTopic()}
      refreshControl={<RefreshControl refreshing={topicRefreshing} onRefresh={() => handleTopicRefresh()} />}
    />
  );
}

export default Home;
