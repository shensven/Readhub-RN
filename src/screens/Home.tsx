import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ListRenderItem, RefreshControl, StyleSheet, TouchableOpacity, Vibration, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CollapsibleRef, MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {IconButton, Text, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundTimer from 'react-native-background-timer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {AxiosResponse} from 'axios';
import appAxios from '../utils/appAxios';
import Loading from './components/Loading/Loading';
import {NewsFeed, TechnewsFeed, TopicsFeed} from '../utils/type';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
  DetailTopic: {id: string};
  DetailNews: {id: string; title: string; publishDate: string; summary: string; hasInstantView?: boolean};
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

//----------------------------------------------------------------------------

const Home: React.FC = () => {
  dayjs.locale('zh-cn');
  dayjs.extend(relativeTime);

  const insets = useSafeAreaInsets();
  const {colors: paperColor} = usePaperTheme();

  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute();

  const tabRef = React.useRef<CollapsibleRef>();

  const [topics, setTopics] = useState<TopicsFeed[]>([]);
  const [news, setNews] = useState<NewsFeed[]>([]);
  const [technews, setTechnews] = useState<TechnewsFeed[]>([]);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [topicLastCursor, setTopicLastCursor] = useState<number>();
  const [newsLastCursor, setNewsLastCursor] = useState<number>();
  const [technewsLastCursor, setTechnewsLastCursor] = useState<number>();

  const [topicsNewCount, setTopicsNewCount] = useState<number>(0);

  //----------------------------------------------------------------------------

  const getTopics = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/topic', {params: {pageSize: 20}});
    // console.log('getTopics', resp.data);
    setTopics(resp.data.data);
    setTopicLastCursor(resp.data.data[19].order);
    setTopicsNewCount(0);
  };

  const getNews = async () => {
    const resp: AxiosResponse<{data: NewsFeed[]}> = await appAxios.get('/news', {params: {pageSize: 20}});
    // console.log('getNews', resp.data);
    setNews(resp.data.data);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setNewsLastCursor(timestamp);
  };

  const getTechnews = async () => {
    const resp: AxiosResponse<{data: TechnewsFeed[]}> = await appAxios.get('/technews', {params: {pageSize: 20}});
    // console.log('getTechnews', resp.data);
    setTechnews(resp.data.data);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setTechnewsLastCursor(timestamp);
  };

  //----------------------------------------------------------------------------

  const getNextTopic = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/topic', {
      params: {pageSize: 20, lastCursor: topicLastCursor},
    });
    // console.log('getNextTopic', resp.data);
    setTopics([...topics, ...resp.data.data]);
    setTopicLastCursor(resp.data.data[19].order);
  };

  const getNextNews = async () => {
    const resp: AxiosResponse<{data: NewsFeed[]}> = await appAxios.get('/news', {
      params: {pageSize: 20, lastCursor: newsLastCursor},
    });
    // console.log('getNextNews', resp.data);
    setNews([...news, ...resp.data.data]);
    const timestamp = dayjs(resp.data.data[19].publishDate).valueOf();
    setNewsLastCursor(timestamp);
  };

  const getNextTechnews = async () => {
    const resp: AxiosResponse<{data: TechnewsFeed[]}> = await appAxios.get('/technews', {
      params: {pageSize: 20, lastCursor: technewsLastCursor},
    });
    // console.log('getNextTechnews', resp.data);
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

  useEffect(() => {
    if (topics.length > 0 && topics.length <= 20 && tabRef.current?.getFocusedTab() === 'Topics') {
      Vibration.vibrate([0, 45, 40, 40]);
    }
  }, [topics]);

  useEffect(() => {
    if (news.length > 0 && news.length <= 20 && tabRef.current?.getFocusedTab() === 'News') {
      Vibration.vibrate([0, 45, 40, 40]);
    }
  }, [news]);

  useEffect(() => {
    if (technews.length > 0 && technews.length <= 20 && tabRef.current?.getFocusedTab() === 'Tech') {
      Vibration.vibrate([0, 45, 40, 40]);
    }
  }, [technews]);

  //----------------------------------------------------------------------------

  const getTopicsNewCount = async () => {
    const resp: {data: {count: number}} = await appAxios.get('/topic/newCount', {
      params: {latestCursor: topics[0]?.order ?? ''},
    });
    // console.log('getTopicsNewCount', resp.data.count);
    setTopicsNewCount(resp.data.count);
  };

  useEffect(() => {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(() => {
      // console.log(topics[0]?.order ?? '空');
      getTopicsNewCount();
    }, 30000);
  }, [topics]);

  //----------------------------------------------------------------------------

  const RNHeaderRight: React.FC = () => {
    const {colors: _paperColor} = usePaperTheme();
    return (
      <View style={styles.RNHeader_right}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.RNHeader_fakeinput, {backgroundColor: _paperColor.rippleAccent}]}
          onPress={() => navigation.navigate('Search')}>
          <Text style={[styles.RNHeader_fakeinput_placeholder, {color: _paperColor.textAccent}]}>搜索</Text>
          <Ionicons
            name="search-outline"
            size={16}
            color={_paperColor.textAccent}
            style={styles.RNHeader_fakeinput_icon}
          />
        </TouchableOpacity>
        <IconButton
          icon={() => <Ionicons name="cog-outline" size={24} />}
          rippleColor={_paperColor.ripple}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ReadHub Native',
      headerTitleAlign: 'left',
      headerTintColor: paperColor.blueText,
      headerRight: () => <RNHeaderRight />,
    });
  }, [navigation, route]);

  //----------------------------------------------------------------------------

  const renderCard: ListRenderItem<TopicsFeed | NewsFeed | TechnewsFeed> = ({item}: {item: any}) => {
    const goDetail = () => {
      switch (tabRef.current?.getFocusedTab()) {
        case 'Topics':
          navigation.navigate('DetailTopic', {id: item.id});
          break;
        case 'News':
        case 'Tech':
          navigation.navigate('DetailNews', {
            id: item.id,
            title: item.title,
            summary: item.summary,
            publishDate: item.publishDate,
            hasInstantView: item.hasInstantView,
          });
          break;
        default:
          return null;
      }
    };

    return (
      <TouchableRipple borderless={true} rippleColor={paperColor.ripple} style={styles.card} onPress={() => goDetail()}>
        <View>
          <Text style={styles.card_title}>{item.title}</Text>
          <Text style={[styles.caed_publishDate, {color: paperColor.textAccent}]}>
            {dayjs(item.publishDate).fromNow()}
          </Text>
          {item.summary.length > 0 && (
            <Text numberOfLines={3} style={styles.card_summary}>
              {item.summary}
            </Text>
          )}
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
            <IconButton
              icon="share-variant"
              size={14}
              color="#FFFFFF"
              rippleColor={paperColor.blueRipple}
              style={[styles.card_iconbtn, {backgroundColor: paperColor.ripple}]}
              onPress={() => {}}
            />
          </View>
        </View>
      </TouchableRipple>
    );
  };

  const TopicsHeader: React.FC = () => {
    if (topicsNewCount === 0) {
      return <View />;
    }
    return (
      <TouchableRipple style={styles.flatlist_header_btn} borderless={true} onPress={() => getTopics()}>
        <Text style={styles.flatlist_header_label}>有 {topicsNewCount} 个新话题，点击刷新</Text>
      </TouchableRipple>
    );
  };

  return (
    <Tabs.Container
      ref={tabRef}
      lazy={true}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          labelStyle={styles.tab_label}
          indicatorStyle={styles.tab_indicator}
          activeColor={paperColor.text}
          inactiveColor={paperColor.textAccent}
        />
      )}>
      <Tabs.Tab name="Topics" label="热门话题">
        <Tabs.FlatList
          data={topics}
          keyExtractor={(item, index: number) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <TopicsHeader />}
          ListHeaderComponentStyle={styles.flatlist_header_root}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={[styles.flatlist_footer, {marginBottom: 16 + insets.bottom}]}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          refreshControl={
            <RefreshControl
              colors={[paperColor.blueText]}
              tintColor={paperColor.blueText}
              refreshing={refreshing}
              onRefresh={() => handleTopicRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={() => getNextTopic()}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News" label="科技动态">
        <Tabs.FlatList
          data={news}
          keyExtractor={(item, index: number) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header_root}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={[styles.flatlist_footer, {marginBottom: 16 + insets.bottom}]}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          refreshControl={
            <RefreshControl
              colors={[paperColor.blueText]}
              tintColor={paperColor.blueText}
              refreshing={refreshing}
              onRefresh={() => handleNewsRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={() => getNextNews()}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="技术资讯">
        <Tabs.FlatList
          data={technews}
          keyExtractor={(item, index: number) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header_root}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={[styles.flatlist_footer, {marginBottom: 16 + insets.bottom}]}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          refreshControl={
            <RefreshControl
              colors={[paperColor.blueText]}
              tintColor={paperColor.blueText}
              refreshing={refreshing}
              onRefresh={() => handleTechnewsRefresh()}
            />
          }
          showsVerticalScrollIndicator={false}
          onEndReached={() => getNextTechnews()}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  RNHeader_right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RNHeader_fakeinput: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  RNHeader_fakeinput_placeholder: {
    paddingLeft: 8,
    paddingRight: 0,
    marginRight: 32,
  },
  RNHeader_fakeinput_icon: {
    marginLeft: 8,
    marginRight: 8,
  },

  tab_label: {
    fontWeight: 'bold',
  },
  tab_indicator: {
    // backgroundColor: '#4A6C91',
    height: 0,
  },

  flatlist_header_root: {
    minHeight: 16,
  },
  flatlist_header_btn: {
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 16,
    marginBottom: 16,
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  flatlist_header_label: {
    fontSize: 12,
    includeFontPadding: false,
  },
  flatlist_footer: {
    marginTop: 16,
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
    paddingRight: 2,
  },
});

export default Home;
