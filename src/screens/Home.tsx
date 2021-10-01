import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {AxiosResponse} from 'axios';
import appAxios from '../utils/appAxios';

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
  Summary: {id: string; title: string; summary: string; publishDate: string};
};
type Props = StackScreenProps<StackParamList, 'Summary'>;
type ScreenNavigationProp = Props['navigation'];

const Home: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute();

  const [topics, setTopics] = useState<TopicsFeed[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [technews, setTechnews] = useState<any[]>([]);

  const getTopics = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await appAxios.get('/topic');
    console.log('getTopics', resp.data.data);
    setTopics(resp.data.data);
  };

  const getNews = async () => {
    const resp: AxiosResponse<{data: NewsFeed[]}> = await appAxios.get('/news');
    console.log('getNews', resp.data.data);
    setNews(resp.data.data);
  };

  const getTechnews = async () => {
    const resp: AxiosResponse<{data: TechnewsFeed[]}> = await appAxios.get('/technews');
    console.log('getTechnews', resp.data.data);
    setTechnews(resp.data.data);
  };

  useLayoutEffect(() => {
    getTopics();
    getNews();
    getTechnews();
  }, []);

  //----------------------------------------------------------------------------

  const RNHeaderRight: React.FC = () => {
    return (
      <View>
        <Text>Test</Text>
      </View>
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
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Summary', {
            id: item.id,
            title: item.title,
            summary: item.summary,
            publishDate: item.publishDate,
          })
        }>
        <Text style={styles.card_title}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.card_summary}>
          {item.summary}
        </Text>
        {/* <Text>{item.newsArray[0]?.siteName}</Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <Tabs.Container
      onTabChange={({index}) => console.log('index')}
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
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={styles.flatlist_footer}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News" label="科技动态">
        <Tabs.FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={styles.flatlist_footer}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="技术资讯">
        <Tabs.FlatList
          data={technews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.flatlist_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={styles.flatlist_footer}
          ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  // root: {},

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
    height: 16,
  },
  flatlist_separator: {
    height: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
    marginRight: 20,
    padding: 16,
    borderRadius: 12,
  },
  card_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card_summary: {
    marginTop: 12,
    lineHeight: 24,
    fontSize: 15,
  },
});

export default Home;
