import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ActivityIndicator, ListRenderItem, Platform, RefreshControl, StyleSheet, Vibration, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CollapsibleRef, MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {Appbar, IconButton, Text, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import BackgroundTimer from 'react-native-background-timer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {AxiosResponse} from 'axios';
import appAxios from '../utils/appAxios';
import Loading from './components/Loading/Loading';
import FocusAwareStatusBar from './components/FocusAwareStatusBar/FocusAwareStatusBar';
import {NewsFeed, TechnewsFeed, TopicsFeed} from '../utils/type';
import {ReadhubnCtx} from '../utils/readhubnContext';

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
  const isFocused = useIsFocused();

  const tabRef = useRef<CollapsibleRef>();

  const [topics, setTopics] = useState<TopicsFeed[]>([]);
  const [news, setNews] = useState<NewsFeed[]>([]);
  const [technews, setTechnews] = useState<TechnewsFeed[]>([]);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [topicLastCursor, setTopicLastCursor] = useState<number>();
  const [newsLastCursor, setNewsLastCursor] = useState<number>();
  const [technewsLastCursor, setTechnewsLastCursor] = useState<number>();

  const [topicsNewCount, setTopicsNewCount] = useState<number>(0);
  const [hasTopicsHeaderActivityIndicator, setHasTopicsHeaderActivityIndicator] = useState<boolean>(false);

  const {
    // input,
    setInput,
    // suggest,
    setSuggest,
    // hasLoading,
    setHasLoading,
    // searchResult,
    setSearchResult,
    // searchResultPage,
    setSearchResultPage,
    listHasRead,
    // setListHasRead,
    bottomSheetModalRef,
    // shareURL,
    setShareURL,
  } = useContext(ReadhubnCtx);

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
    // console.log('getTopics() getNews() getTechnews()');
    getTopics();
    getNews();
    getTechnews();
  }, []);

  const handleTopicRefresh = () => {
    setRefreshing(true);
    setTopicLastCursor(undefined);
    getTopics();
    setRefreshing(false);
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 45, 40, 40]);
    }
  };

  const handleNewsRefresh = () => {
    setRefreshing(true);
    setNewsLastCursor(undefined);
    getNews();
    setRefreshing(false);
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 45, 40, 40]);
    }
  };

  const handleTechnewsRefresh = () => {
    setRefreshing(true);
    setTechnewsLastCursor(undefined);
    getTechnews();
    setRefreshing(false);
    if (Platform.OS === 'android') {
      Vibration.vibrate([0, 45, 40, 40]);
    }
  };

  //----------------------------------------------------------------------------

  const getTopicsNewCount = async () => {
    const resp: {data: {count: number}} = await appAxios.get('/topic/newCount', {
      params: {latestCursor: topics[0]?.order ?? ''},
    });
    // console.log('getTopicsNewCount', resp.data.count);
    setTopicsNewCount(resp.data.count);
  };

  useEffect(() => {
    // console.log('BackgroundTimer');
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(() => {
      // console.log(topics[0]?.order ?? '空');
      getTopicsNewCount();
    }, 30000);
  }, []);

  useEffect(() => {
    setInput('');
    setSuggest([]);
    setSearchResult([]);
    setSearchResultPage(2);
    setHasLoading(false);
  }, [isFocused]);

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
      <TouchableRipple
        borderless={true}
        rippleColor={paperColor.ripple}
        style={[
          styles.card,
          {
            backgroundColor:
              listHasRead.indexOf(item.id) === -1 ? paperColor.cardBackground : paperColor.cardBackgroundAlreadyRead,
          },
        ]}
        onPress={() => goDetail()}>
        <View>
          <Text
            style={[
              styles.card_title,
              {color: listHasRead.indexOf(item.id) === -1 ? paperColor.text : paperColor.textAlreadyRead},
            ]}>
            {item.title}
          </Text>
          <Text style={[styles.caed_publishDate, {color: paperColor.textAccent}]}>
            {dayjs(item.publishDate).fromNow()}
          </Text>
          {item.summary.length > 0 && (
            <Text numberOfLines={3} style={[styles.card_summary, {color: paperColor.text}]}>
              {item.summary}
            </Text>
          )}
          <View style={styles.card_bottom}>
            <View style={styles.card_bottom_left}>
              <Text numberOfLines={1} style={styles.card_siteName}>
                {'newsArray' in item && (
                  <>
                    <Text style={[styles.card_siteName_unit, {color: paperColor.text}]}>
                      {item.newsArray[0]?.siteName + ' '}
                    </Text>
                    {item.newsArray.length > 1 && (
                      <Text style={[styles.card_siteName_unit, {color: paperColor.text}]}>
                        等{' ' + item.newsArray.length + ' '}家媒体
                      </Text>
                    )}
                    <Text style={[styles.card_siteName_unit, {color: paperColor.text}]}>报道</Text>
                  </>
                )}
                {item.siteName?.length > 1 && (
                  <Text style={[styles.card_siteName_unit, {color: paperColor.text}]}>{item.siteName}</Text>
                )}
                {item.authorName?.length > 1 && (
                  <Text style={[styles.card_siteName_unit, {color: paperColor.text}]}>{' / ' + item.authorName}</Text>
                )}
              </Text>
            </View>
            {'eventData' in item && (
              <IconButton
                icon="share-variant"
                size={14}
                color="#FFFFFF"
                rippleColor={paperColor.ripple}
                style={[styles.card_iconbtn, {backgroundColor: paperColor.ripple}]}
                onPress={() => {
                  bottomSheetModalRef.current?.present();
                  setTimeout(() => {
                    setShareURL('https://readhub.cn/topic/' + item.id);
                  }, 250);
                }}
              />
            )}
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
      <TouchableRipple
        style={[styles.flatlist_header_btn, {backgroundColor: paperColor.cardBackground}]}
        borderless={true}
        onPress={() => {
          setHasTopicsHeaderActivityIndicator(true);
          getTopics();
          setHasTopicsHeaderActivityIndicator(false);
        }}>
        {hasTopicsHeaderActivityIndicator ? (
          <ActivityIndicator color={paperColor.blueText} />
        ) : (
          <Text style={[styles.flatlist_header_label, {color: paperColor.text}]}>
            有 {topicsNewCount} 个新话题，点击刷新
          </Text>
        )}
      </TouchableRipple>
    );
  };

  return (
    <>
      <Tabs.Container
        ref={tabRef}
        minHeaderHeight={insets.top}
        revealHeaderOnScroll={true}
        HeaderComponent={() => (
          <>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" />
            <Appbar.Header style={[styles.appbar, {marginTop: Platform.OS === 'android' ? insets.top : 0}]}>
              <Appbar.Content title="Readhub Native" titleStyle={styles.appbar_title} />
              <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} />
              <Appbar.Action
                icon={Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'}
                onPress={() => navigation.navigate('Settings')}
              />
            </Appbar.Header>
          </>
        )}
        headerContainerStyle={styles.tab_headerContainer}
        renderTabBar={props => (
          <MaterialTabBar
            {...props}
            scrollEnabled
            labelStyle={styles.tab_label}
            indicatorStyle={[styles.tab_indicator, {backgroundColor: paperColor.blueRipple}]}
            activeColor={paperColor.textForceLight}
            inactiveColor={paperColor.textForceLightAccent}
            style={{backgroundColor: paperColor.primary}}
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
            overScrollMode="never"
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
            overScrollMode="never"
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
            overScrollMode="never"
            onEndReached={() => getNextTechnews()}
          />
        </Tabs.Tab>
      </Tabs.Container>
      <View style={[styles.fake_statusbar, {height: insets.top, backgroundColor: paperColor.primary}]} />
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    elevation: 0,
    shadowOpacity: 0,
  },
  appbar_title: {
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
  },

  tab_headerContainer: {
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab_label: {
    fontWeight: 'bold',
  },
  tab_indicator: {
    // height: 8,
    height: 0,
  },

  flatlist_header_root: {
    minHeight: 16,
  },
  flatlist_header_btn: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    marginBottom: 16,
    height: 32,
    // padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 16,
    marginRight: 16,
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
  fake_statusbar: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});

export default Home;
