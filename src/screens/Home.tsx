import React, {useLayoutEffect, useRef, useState} from 'react';
import {View, StyleSheet, ListRenderItem, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {CollapsibleRef, MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import axios, {AxiosResponse} from 'axios';
import feedAxios from '../utils/feedAxios';
import IcRoundShare from '../icons/IcRoundShare';
import Loading from '../animation/Loading/Loading';

type StackParamList = {
  Detail: {id: string};
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface Daily {
  daily: {
    title: string;
    uid: string;
  }[];
  ts: number;
}

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

// interface NewsFeed {
//   authorName: string;
//   id: number;
//   language: string;
//   mobileUrl: string;
//   publishDate: string;
//   siteName: string;
//   summary: string;
//   summaryAuto: string;
//   title: string;
//   url: string;
// }

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const screenHeight = Dimensions.get('screen').height;

const Home: React.FC = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const tabRef = useRef<CollapsibleRef>();

  const [daily, setDaily] = useState<Daily>({
    daily: [],
    ts: 0,
  });
  const [topics, setTopics] = useState<TopicsFeed[]>([]);
  // const [news, setNews] = useState<NewsFeed[]>([]);

  const getDaily = async () => {
    const resp: AxiosResponse = await axios.get('https://readhub.cn/_next/data/ifz6UBjfA-J94X4idVCQH/daily.json');
    console.log('getDaily', resp.data.pageProps);
    setDaily(resp.data.pageProps);
  };

  const getTopics = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await feedAxios.get('/topic', {params: {pageSize: 20}});
    // console.log('getTopics', resp.data);
    setTopics(resp.data.data);
  };

  // const getNews = async () => {
  //   const resp: AxiosResponse<{data: NewsFeed[]}> = await feedAxios.get('/news', {params: {pageSize: 20}});
  //   setNews(resp.data.data);
  // };

  useLayoutEffect(() => {
    getDaily();
    getTopics();
    // getNews();
  }, []);

  const renderDaily: ListRenderItem<{title: string; uid: string}> = React.useCallback(
    ({item}) => {
      return (
        <View style={{flexDirection: 'row', marginLeft: 14, marginRight: 14}}>
          <Text style={{fontSize: 16, lineHeight: 16 * 1.5}}>・</Text>
          <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('Detail', {id: item.uid})}>
            <Text style={{fontSize: 16, fontWeight: 'bold', lineHeight: 16 * 1.5, opacity: 0.8}}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [colors, navigation],
  );

  const renderItem: ListRenderItem<TopicsFeed> = React.useCallback(
    ({item}) => {
      return (
        <TouchableRipple
          borderless
          rippleColor={colors.ripple}
          style={{marginLeft: 14, marginRight: 14, padding: 16, borderRadius: 12, backgroundColor: colors.surface}}
          onPress={() => navigation.navigate('Detail', {id: item.id})}>
          <>
            <Text style={{marginTop: 8, fontSize: 18, fontWeight: 'bold', textAlign: 'justify', lineHeight: 18 * 1.5}}>
              {item.title}
            </Text>
            <View style={{marginTop: 12, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12}}>🕙</Text>
              <Text style={{marginLeft: 2, fontSize: 12, color: colors.textAccent}}>
                {dayjs(item.publishDate).fromNow()}
              </Text>
            </View>
            <Text numberOfLines={3} style={{marginTop: 16, fontSize: 15, textAlign: 'justify', lineHeight: 15 * 1.5}}>
              {item.summary}
            </Text>
            <View style={{marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 12}}>📰</Text>
                {item.newsArray.length === 1 && (
                  <Text style={{marginLeft: 2, fontSize: 12, color: colors.textAccent}}>
                    {item.newsArray[0].siteName + ' 报道'}
                  </Text>
                )}
                {item.newsArray.length > 1 && (
                  <Text style={{marginLeft: 2, fontSize: 12, color: colors.textAccent}}>
                    {item.newsArray[0].siteName + ' 等 ' + item.newsArray.length + ' 家媒体报道'}
                  </Text>
                )}
              </View>
              <TouchableRipple
                borderless
                rippleColor={colors.ripple}
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 2,
                  backgroundColor: colors.ripple,
                }}
                onPress={() => {}}>
                <IcRoundShare size={14} color={colors.surface} />
              </TouchableRipple>
            </View>
          </>
        </TouchableRipple>
      );
    },
    [colors, navigation],
  );

  return (
    <Tabs.Container
      ref={tabRef}
      headerContainerStyle={{shadowOpacity: 0, elevation: 0}}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          labelStyle={{fontWeight: 'bold', margin: 0}}
          activeColor={colors.primary}
          indicatorStyle={{height: 0, backgroundColor: colors.primary}}
        />
      )}>
      <Tabs.Tab name="daily" label="🌞每日早报">
        <Tabs.FlatList
          data={daily.daily}
          renderItem={renderDaily}
          ListHeaderComponent={() =>
            daily.ts === 0 ? (
              <View style={{marginTop: screenHeight / 4}}>
                <Loading />
              </View>
            ) : (
              <View style={{marginLeft: 14, marginRight: 14, marginBottom: 24}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {daily.ts !== 0 && dayjs(daily.ts * 1000).format('YYYY-MM-DD')}
                </Text>
                <Text style={{fontSize: 14, marginTop: 4, color: colors.textAccent}}>
                  {daily.ts !== 0 && dayjs(daily.ts * 1000).format('dddd')}
                </Text>
              </View>
            )
          }
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
          ItemSeparatorComponent={() => <View style={{height: 24}} />}
          keyExtractor={item => item.uid}
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: colors.surface}}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Topics" label="🔥热门话题">
        <Tabs.FlatList
          data={topics}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={{marginTop: 24, marginBottom: 24 + insets.bottom}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News" label="🚀科技动态">
        <Tabs.FlatList
          data={topics}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={{marginTop: 24, marginBottom: 24 + insets.bottom}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="🔨开发者资讯">
        <Tabs.FlatList
          data={topics}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <Loading />}
          ListFooterComponentStyle={{marginTop: 24, marginBottom: 24 + insets.bottom}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  list_header: {
    height: 12,
  },
  item_separator: {
    height: 12,
  },
});

export default Home;
