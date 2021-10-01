import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {AxiosResponse} from 'axios';
import appAxios from '../utils/appAxios';

interface Feed {
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

const Home: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [topics, setTopics] = useState<Feed[]>([]);
  const [news, setNews] = useState<Feed[]>([]);
  const [technews, setTechnews] = useState<Feed[]>([]);

  const getTopics = async () => {
    const resp: AxiosResponse<{data: Feed[]}> = await appAxios.get('/topic');
    // console.log(resp);
    setTopics(resp.data.data);
  };

  const getNews = async () => {
    const resp: AxiosResponse<{data: Feed[]}> = await appAxios.get('/news');
    // console.log(resp);
    setNews(resp.data.data);
  };

  const getTechnews = async () => {
    const resp: AxiosResponse<{data: Feed[]}> = await appAxios.get('/technews');
    // console.log(resp);
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

  const renderCard = ({item}: {item: Feed}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.card_title}>{item.title}</Text>
        <Text numberOfLines={3} style={styles.card_summary}>
          {item.summary}
        </Text>
      </View>
    );
  };

  return (
    <Tabs.Container
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          labelStyle={styles.tab_label}
          indicatorStyle={styles.tab_indicator}
        />
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
          ItemSeparatorComponent={() => (
            <View style={styles.flatlist_separator} />
          )}
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
          ItemSeparatorComponent={() => (
            <View style={styles.flatlist_separator} />
          )}
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
          ItemSeparatorComponent={() => (
            <View style={styles.flatlist_separator} />
          )}
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
  },
});

export default Home;
