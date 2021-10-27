import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity, Linking} from 'react-native';
import {IconButton, Text, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReadhubnCtx} from '../utils/readhubnContext';
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

  const insets = useSafeAreaInsets();
  const {colors: paperColor} = usePaperTheme();

  const isFocused = useIsFocused();
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const {id} = route.params;

  const {
    // input,
    // setInput,
    // suggest,
    setSuggest,
    // hasLoading,
    setHasLoading,
    // searchResult,
    // setSearchResult,
    // searchResultPage,
    // setSearchResultPage,
    listHasRead,
    setListHasRead,
    bottomSheetModalRef,
    // shareURL,
    setShareURL,
  } = useContext(ReadhubnCtx);

  const [hasFinalView, setHasFinalView] = useState<boolean>(false);
  const [detail, setDetail] = useState<Detail>({} as Detail);

  const getTopicSummary = async () => {
    const resp: {data: Detail} = await appAxios.get(`/topic/${id}`);
    // console.log('getTopicSummary', resp.data);
    setDetail(resp.data);
    setHasFinalView(true);
  };

  const persistListHasRead = () => {
    const jsonVal: string = JSON.stringify([...listHasRead, id]);
    AsyncStorage.setItem('@listHasRead', jsonVal);
  };

  useLayoutEffect(() => {
    getTopicSummary();
  }, []);

  useEffect(() => {
    if (listHasRead.indexOf(id) === -1) {
      setTimeout(() => {
        setListHasRead([...listHasRead, id]);
        persistListHasRead();
      }, 250);
    }
    setSuggest([]);
    setHasLoading(false);
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '话题详情',
      headerBackTitle: '返回',
      cardStyle: {backgroundColor: '#FFFFFF'},
    });
  }, []);

  switch (hasFinalView) {
    case true:
      return (
        hasFinalView && (
          <ScrollView
            scrollIndicatorInsets={{right: 1}}
            contentContainerStyle={[styles.root, {paddingBottom: insets.bottom + 24}]}>
            <Text selectable={true} style={styles.title}>
              {detail.title}
            </Text>
            <Text style={[styles.publishDate, {color: paperColor.textAccent}]}>
              {dayjs(detail.publishDate).fromNow()}
            </Text>
            <Text selectable={true} style={styles.summary}>
              {detail.summary}
            </Text>
            <View style={styles.mid}>
              <TouchableRipple
                disabled={!detail.hasInstantView}
                borderless={true}
                rippleColor={paperColor.blueRipple}
                style={[
                  styles.instant,
                  {backgroundColor: detail.hasInstantView ? paperColor.blueRipple : paperColor.ripple},
                ]}
                onPress={() => navigation.navigate('Instant', {id})}>
                <>
                  <Ionicons
                    name="glasses-outline"
                    size={24}
                    color={detail.hasInstantView ? paperColor.blueText : paperColor.textAccent}
                  />
                  <Text
                    style={[
                      styles.instant_label,
                      {color: detail.hasInstantView ? paperColor.blueText : paperColor.textAccent},
                    ]}>
                    即时预览
                  </Text>
                </>
              </TouchableRipple>

              <IconButton
                icon="share-variant"
                size={14}
                color="#FFFFFF"
                rippleColor={paperColor.ripple}
                style={[styles.iconbtn, {backgroundColor: paperColor.ripple}]}
                onPress={() => {
                  bottomSheetModalRef.current?.present();
                  setTimeout(() => {
                    setShareURL('https://readhub.cn/topic/' + id);
                  }, 250);
                }}
              />
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottom_title}>
                <Ionicons name="newspaper-outline" size={16} />
                <Text style={styles.bottom_title_text}>媒体报道</Text>
              </View>
              {detail?.newsArray?.map((newsReporterItem: NewsArray, newsReporterIndex: number) => (
                <View key={newsReporterIndex} style={styles.bottom_item}>
                  <Text>・</Text>
                  <View style={styles.bottom_item_right}>
                    <TouchableOpacity
                      style={styles.bottom_item_btn}
                      onPress={() => Linking.openURL(newsReporterItem.mobileUrl)}>
                      <Text>
                        {newsReporterItem.title + ' '}
                        <Ionicons
                          name="open-outline"
                          size={10}
                          color={paperColor.textAccent}
                          style={styles.bottom_item_icon}
                        />
                      </Text>
                    </TouchableOpacity>
                    <Text style={[styles.bottom_item_subTitle, {color: paperColor.textAccent}]}>
                      {newsReporterItem.siteName}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottom_title}>
                <Ionicons name="time-outline" size={16} />
                <Text style={styles.bottom_title_text}>相关事件</Text>
              </View>
              {detail?.timeline?.topics?.map((topicsItem: Topics, topicIndex: number) => (
                <View key={topicIndex} style={styles.bottom_item}>
                  <Text>・</Text>
                  <View style={styles.bottom_item_right}>
                    <TouchableOpacity
                      onPress={() => {
                        if (detail.id !== topicsItem.id) {
                          navigation.push('DetailTopic', {id: topicsItem.id});
                        }
                      }}>
                      <Text>{topicsItem.title}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.bottom_item_subTitle, {color: paperColor.textAccent}]}>
                      {dayjs(topicsItem.createdAt).format('YYYY-MM-DD')}
                    </Text>
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
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  instant_label: {
    includeFontPadding: false,
    marginLeft: 4,
  },
  iconbtn: {
    paddingRight: 2,
  },

  bottom: {
    marginTop: 24,
  },

  bottom_title: {
    flexDirection: 'row',
    alignItems: 'center',
    includeFontPadding: false,
  },
  bottom_title_text: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 6,
  },

  bottom_item: {
    marginTop: 16,
    flexDirection: 'row',
  },
  bottom_item_right: {
    flex: 1,
  },
  bottom_item_btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom_item_icon: {
    marginLeft: 4,
  },
  bottom_item_subTitle: {
    fontSize: 10,
    marginTop: 2,
  },
});

export default DetailTopic;
