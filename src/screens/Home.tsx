import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ListRenderItem} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {CollapsibleRef, MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import {AxiosResponse} from 'axios';
import feedAxios from '../utils/feedAxios';
import IcRoundShare from '../icons/IcRoundShare';

type StackParamList = {
  Detail: undefined;
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

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const Home: React.FC = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const tabRef = useRef<CollapsibleRef>();

  const [topics, setTopics] = useState<TopicsFeed[]>([]);

  const getTopics = async () => {
    const resp: AxiosResponse<{data: TopicsFeed[]}> = await feedAxios.get('/topic', {params: {pageSize: 20}});
    console.log('getTopics', resp.data);
    setTopics(resp.data.data);
  };

  useEffect(() => {
    getTopics();
  }, []);

  const renderItem: ListRenderItem<TopicsFeed> = React.useCallback(
    ({item}) => {
      return (
        <TouchableRipple
          borderless
          rippleColor={colors.ripple}
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={() => navigation.navigate('Detail')}>
          <>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.timestamp}>
              <Text style={styles.timestamp_emoji}>🕙</Text>
              <Text style={[styles.timestamp_text, {color: colors.textAccent}]}>
                {dayjs(item.publishDate).fromNow()}
              </Text>
            </View>
            <Text numberOfLines={3} style={styles.summary}>
              {item.summary}
            </Text>
            <View style={styles.more}>
              <View style={styles.reporter}>
                <Text style={styles.reporter_emoji}>📰</Text>
                {item.newsArray.length === 1 && (
                  <Text style={[styles.reporter_text, {color: colors.textAccent}]}>
                    {item.newsArray[0].siteName + ' 报道'}
                  </Text>
                )}
                {item.newsArray.length > 1 && (
                  <Text style={[styles.reporter_text, {color: colors.textAccent}]}>
                    {item.newsArray[0].siteName + ' 等 ' + item.newsArray.length + ' 家媒体报道'}
                  </Text>
                )}
              </View>
              <TouchableRipple
                borderless
                rippleColor={colors.ripple}
                style={[styles.action, {backgroundColor: colors.ripple}]}
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
      headerContainerStyle={styles.header_container}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          labelStyle={styles.tab_label}
          activeColor={colors.primary}
          indicatorStyle={[styles.tab_indicator, {backgroundColor: colors.primary}]}
          style={[styles.tab, {borderBottomColor: colors.background}]}
        />
      )}>
      <Tabs.Tab name="Topics" label="🔥热门话题">
        <Tabs.FlatList
          data={topics}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
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
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="🔨技术资讯">
        <Tabs.FlatList
          data={topics}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  header_container: {
    shadowOpacity: 0,
    elevation: 0,
  },
  tab: {
    borderBottomWidth: 1,
  },
  tab_label: {
    fontWeight: 'bold',
    margin: 0,
  },
  tab_indicator: {
    height: 0,
  },
  list_header: {
    height: 12,
  },
  item_separator: {
    height: 12,
  },
  item: {
    marginLeft: 14,
    marginRight: 14,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
    lineHeight: 18 * 1.5,
  },
  timestamp: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp_emoji: {
    fontSize: 12,
  },
  timestamp_text: {
    marginLeft: 2,
    fontSize: 12,
  },
  summary: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 15 * 1.5,
  },
  more: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reporter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reporter_emoji: {
    fontSize: 12,
  },
  reporter_text: {
    marginLeft: 2,
    fontSize: 12,
  },
  action: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 2,
  },
});

export default Home;
