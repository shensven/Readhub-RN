import React, {useLayoutEffect, useState} from 'react';
import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {IconButton, TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {AxiosResponse} from 'axios';
import appAxios from '../utils/appAxios';
import Loading from './components/Loading/Loading';

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
    duplicateId: number;
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

interface NewsFeed {
  authorName: string;
  id: number;
  language: string;
  mobileUrl: string;
  publishDate: string;
  siteName: string;
  summary: string;
  summaryAuto: string;
  title: string;
  url: string;
}

interface TechnewsFeed extends NewsFeed {}

type StackParamList = {
  Settings: undefined;
  Summary: {id: string; title: string; publishDate: string; summary: string; hasInstantView?: boolean};
};
type Props = StackScreenProps<StackParamList, 'Summary'>;
type ScreenNavigationProp = Props['navigation'];

//----------------------------------------------------------------------------

const Home: React.FC = () => {
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute();

  const [topics, setTopics] = useState<TopicsFeed[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [technews, setTechnews] = useState<any[]>([]);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [topicLastCursor, setTopicLastCursor] = useState<number>();
  const [newsLastCursor, setNewsLastCursor] = useState<number>();
  const [technewsLastCursor, setTechnewsLastCursor] = useState<number>();

  //----------------------------------------------------------------------------

  const getTopics = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/topic', {params: {pageSize: 20}});
    console.log('getTopics', resp.data);
    setTopics(resp.data.data);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const getNews = async () => {
    const resp: AxiosResponse<{data: NewsFeed[]}> = await appAxios.get('/news', {params: {pageSize: 20}});
    console.log('getNews', resp.data);
    setNews(resp.data.data);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setNewsLastCursor(timestamp);
  };

  const getTechnews = async () => {
    const resp: AxiosResponse<{data: TechnewsFeed[]}> = await appAxios.get('/technews', {params: {pageSize: 20}});
    console.log('getTechnews', resp.data);
    setTechnews(resp.data.data);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setTechnewsLastCursor(timestamp);
  };

  //----------------------------------------------------------------------------

  const getNextTopic = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/topic', {
      params: {
        pageSize: 20,
        lastCursor: topicLastCursor,
      },
    });
    console.log('getNextTopic', resp.data);
    setTopics([...topics, ...resp.data.data]);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const getNextNews = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/news', {
      params: {
        pageSize: 20,
        lastCursor: newsLastCursor,
      },
    });
    console.log('getNextNews', resp.data);
    setNews([...news, ...resp.data.data]);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setNewsLastCursor(timestamp);
  };

  const getNextTechnews = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/technews', {
      params: {
        pageSize: 20,
        lastCursor: technewsLastCursor,
      },
    });
    console.log('getNextTechnews', resp.data);
    setTechnews([...technews, ...resp.data.data]);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setTechnewsLastCursor(timestamp);
  };

  //----------------------------------------------------------------------------

  useLayoutEffect(() => {
    getTopics();
    getNews();
    getTechnews();
  }, []);

  const handleTopicRefresh = () => {
    setRefreshing(true);
    setTopicLastCursor(undefined);
    getTopics();
    setRefreshing(false);
  };

  const handleNewsRefresh = () => {
    setRefreshing(true);
    setNewsLastCursor(undefined);
    getNews();
    setRefreshing(false);
  };

  const handleTechnewsRefresh = () => {
    setRefreshing(true);
    setTechnewsLastCursor(undefined);
    getTechnews();
    setRefreshing(false);
  };

  //----------------------------------------------------------------------------

  const RNHeaderRight: React.FC = () => {
    return (
      <IconButton
        icon={() => <Ionicons name="cog-outline" size={24} />}
        onPress={() => navigation.navigate('Settings')}
      />
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ReadHubn',
      headerRight: () => <RNHeaderRight />,
    });
  }, [navigation, route]);

  //----------------------------------------------------------------------------

  const renderCard = ({item}: {item: any}) => {
    return (
      <TouchableRipple
        borderless={true}
        style={styles.card}
        onPress={() =>
          navigation.navigate('Summary', {
            id: item.id,
            title: item.title,
            summary: item.summary,
            publishDate: item.publishDate,
            hasInstantView: item.hasInstantView,
          })
        }>
        <View>
          <Text style={styles.card_title}>{item.title}</Text>
          <Text style={styles.caed_publishDate}>{dayjs(item.publishDate).fromNow()}</Text>
          <Text numberOfLines={3} style={styles.card_summary}>
            {item.summary}
          </Text>
          <View style={styles.card_bottom}>
            <View style={styles.card_bottom_left}>
              <Text numberOfLines={1} style={styles.card_siteName}>
                {'newsArray' in item && (
                  <>
                    <Text style={styles.card_siteName_unit}>{item.newsArray[0]?.siteName + ' '}</Text>
                    {item.newsArray.length > 1 && (
                      <Text style={styles.card_siteName_unit}>等{' ' + item.newsArray.length + ' '}家媒体</Text>
                    )}
                    <Text style={styles.card_siteName_unit}>报道</Text>
                  </>
                )}
                {item.siteName?.length > 1 && <Text style={styles.card_siteName_unit}>{item.siteName}</Text>}
                {item.authorName?.length > 1 && (
                  <Text style={styles.card_siteName_unit}>{' / ' + item.authorName}</Text>
                )}
              </Text>
            </View>
            <IconButton icon="share-variant" size={14} color="#FFFFFF" style={styles.card_iconbtn} onPress={() => {}} />
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <Tabs.Container
      renderTabBar={props => (
        <MaterialTabBar {...props} scrollEnabled labelStyle={styles.tab_label} indicatorStyle={styles.tab_indicator} />
      )}>
      <Tabs.Tab name="Topics" label="热门话题">
        <Tabs.FlatList
          data={topics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={styles.flatlist_footer}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => handleTopicRefresh()} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => getNextTopic()}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News" label="科技动态">
        <Tabs.FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={styles.flatlist_footer}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => handleNewsRefresh()} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => getNextNews()}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="技术资讯">
        <Tabs.FlatList
          data={technews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={styles.flatlist_footer}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => handleTechnewsRefresh()} />}
          showsVerticalScrollIndicator={false}
          onEndReached={() => getNextTechnews()}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  // root: {},
  // RNHeaderRight: {},

  tab_label: {
    fontWeight: 'bold',
  },
  tab_indicator: {
    backgroundColor: '#4A6C91',
  },

  flatlist_header: {
    height: 16,
  },
  flatlist_footer: {
    marginTop: 16,
    marginBottom: 16,
  },
  flatlist_separator: {
    height: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    padding: 16,
    paddingTop: 20,
    borderRadius: 12,
  },
  card_title: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 27,
    textAlign: 'justify',
  },
  caed_publishDate: {
    marginTop: 8,
  },
  card_summary: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  card_bottom: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card_bottom_left: {
    width: '80%',
  },
  card_siteName: {
    flexDirection: 'row',
  },
  card_siteName_unit: {
    includeFontPadding: false,
  },
  card_iconbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingRight: 2,
  },
});

export default Home;
