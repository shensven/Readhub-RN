import React, {useContext, useLayoutEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconButton, Text, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from './components/FocusAwareStatusBar/FocusAwareStatusBar';
import Loading from './components/Loading/Loading';
import dayjs from 'dayjs';
import axios from 'axios';
import {ReadhubnCtx} from '../utils/readhubnContext';
import {SearchReault} from '../utils/type';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
  DetailTopic: {id: string};
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface SuggestItem {
  entityId: string;
  entityName: string;
  entityType: string;
  text: string;
  type: string;
}

const Search: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const {colors: paperColor} = usePaperTheme();

  const {
    input,
    // setInput,
    suggest,
    setSuggest,
    hasLoading,
    setHasLoading,
    searchResult,
    setSearchResult,
    searchResultPage,
    setSearchResultPage,
    listHasRead,
    // setListHasRead,
    bottomSheetModalRef,
    // shareURL,
    setShareURL,
  } = useContext(ReadhubnCtx);

  useLayoutEffect(() => {
    if (suggest.length > 0) {
      setHasLoading(false);
    }
  }, [searchResult]);

  //------------------------------------------------------------------------------

  const goSearch = async (_prop: string) => {
    const resp: {data: {data: {items: SearchReault[]}}} = await axios.get('https://search.readhub.cn/api/entity/news', {
      params: {page: 1, seze: 20, query: _prop, type: 'hot'},
    });
    // console.log('goSearch', resp);
    setSearchResult(resp.data.data.items);
  };

  const goNextSearch = async () => {
    const resp: {data: {data: {items: SearchReault[]}}} = await axios.get('https://search.readhub.cn/api/entity/news', {
      params: {page: searchResultPage, seze: 20, query: input, type: 'hot'},
    });
    // console.log('goNextSearch', resp);
    setSearchResult([...searchResult, ...resp.data.data.items]);
    setSearchResultPage(searchResultPage + 1);
  };

  //------------------------------------------------------------------------------

  const renderSuggestList = ({item}: {item: SuggestItem}) => {
    return (
      <TouchableOpacity
        style={[styles.suggest_list_touchable, {backgroundColor: paperColor.cardBackground}]}
        activeOpacity={0.6}
        onPress={() => {
          setSuggest([]);
          setHasLoading(true);
          goSearch(item.entityName);
        }}>
        <Ionicons name="search-circle" size={16} color={paperColor.ripple} />
        <Text style={styles.suggest_list_keyword}>{item.entityName}</Text>
      </TouchableOpacity>
    );
  };

  const renderCard = ({item}: {item: SearchReault}) => {
    return (
      <TouchableRipple
        borderless={true}
        rippleColor={paperColor.ripple}
        style={[
          styles.card,
          {
            backgroundColor:
              listHasRead.indexOf(item.topicId) === -1
                ? paperColor.cardBackground
                : paperColor.cardBackgroundAlreadyRead,
          },
        ]}
        onPress={() => navigation.navigate('DetailTopic', {id: item.topicId})}>
        <View>
          <Text
            style={[
              styles.card_title,
              {color: listHasRead.indexOf(item.topicId) === -1 ? paperColor.text : paperColor.textAlreadyRead},
            ]}>
            {item.topicTitle}
          </Text>
          <Text style={[styles.caed_publishDate, {color: paperColor.textAccent}]}>
            {dayjs(item.topicCreateAt).format('YYYY-MM-DD')}
          </Text>
          {item.topicSummary.length > 0 && (
            <Text numberOfLines={3} style={styles.card_summary}>
              {item.topicSummary}
            </Text>
          )}
          <View style={styles.card_bottom}>
            <View style={styles.card_bottom_left}>
              <Text numberOfLines={1} style={styles.card_siteName}>
                {'newsList' in item && (
                  <>
                    <Text style={styles.card_siteName_unit}>{item.newsList[0]?.siteName + ' '}</Text>
                    {item.newsList.length > 1 && (
                      <Text style={styles.card_siteName_unit}>等{' ' + item.newsList.length + ' '}家媒体</Text>
                    )}
                    <Text style={styles.card_siteName_unit}>报道</Text>
                  </>
                )}
              </Text>
            </View>
            <IconButton
              icon="share-variant"
              size={14}
              color="#FFFFFF"
              rippleColor={paperColor.ripple}
              style={[styles.card_iconbtn, {backgroundColor: paperColor.ripple}]}
              onPress={() => {
                bottomSheetModalRef.current?.present();
                setTimeout(() => {
                  setShareURL('https://readhub.cn/topic/' + item.topicId);
                }, 250);
              }}
            />
          </View>
        </View>
      </TouchableRipple>
    );
  };

  if (searchResult.length === 0) {
    return (
      <>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
        <FlatList
          data={suggest}
          keyExtractor={(item: SuggestItem) => item.entityId}
          renderItem={renderSuggestList}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.suggest_list_header}
          ListEmptyComponent={() =>
            hasLoading ? (
              <View style={styles.suggest_list_empty}>
                <Loading />
              </View>
            ) : null
          }
          ItemSeparatorComponent={() => <View style={styles.suggest_list_separator} />}
          showsVerticalScrollIndicator={false}
        />
      </>
    );
  }

  return (
    <>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <FlatList
        data={searchResult}
        keyExtractor={(item: SearchReault) => item.topicId}
        renderItem={renderCard}
        ListHeaderComponent={() => <View />}
        ListHeaderComponentStyle={styles.flatlist_header}
        ListFooterComponent={() => <Loading />}
        ListFooterComponentStyle={[styles.flatlist_footer, {marginBottom: 16 + insets.bottom}]}
        ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
        onEndReached={() => goNextSearch()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  suggest_list_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  // suggest_list_icon: {},
  suggest_list_keyword: {
    marginLeft: 8,
    includeFontPadding: false,
  },
  suggest_list_header: {
    height: 1,
  },
  suggest_list_separator: {
    height: 1,
  },
  suggest_list_empty: {
    marginTop: 32,
  },

  flatlist_header: {
    marginTop: 16,
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
});

export default Search;
