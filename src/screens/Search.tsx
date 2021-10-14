import React, {useContext, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import axios from 'axios';
import {SearchCtx} from '../utils/searchContext';
import {SearchReault} from '../utils/type';

const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

type StackParamList = {
  Search: undefined;
  Settings: undefined;
  DetailTopic: {id: string};
  DetailNews: {id: string; title: string; publishDate: string; summary: string; hasInstantView?: boolean};
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
  const navigation = useNavigation<ScreenNavigationProp>();

  const {suggest, searchResult, setSearchResult} = useContext(SearchCtx);

  //------------------------------------------------------------------------------

  const RNHeaderLeft: React.FC = () => {
    const [input, setInput] = useState<string>('');

    const {setSuggest: _setSuggest, setSearchResult: _setSearchResult} = useContext(SearchCtx);

    const getSuggest = async () => {
      if (input.length !== 0) {
        const resp: {data: {result: {data: {items: SuggestItem[]}}}} = await axios.get(
          'https://search.readhub.cn/api/entity/suggest',
          {params: {q: input}},
        );
        // console.log('_getSuggest', resp);
        _setSuggest(resp.data.result.data.items);
      }
    };

    return (
      <View style={styles.RNHeader_left}>
        <TextInput
          value={input}
          placeholder="搜索"
          placeholderTextColor="rgba(0, 0, 0.7)"
          style={styles.RNHeader_input}
          autoFocus={true}
          onChangeText={text => setInput(text)}
          onSubmitEditing={() => getSuggest()}
          onFocus={() => _setSearchResult([])}
        />
      </View>
    );
  };

  const RNHeaderRight: React.FC = () => {
    const {setSuggest: _setSuggest} = useContext(SearchCtx);
    return (
      <TouchableOpacity
        hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
        style={styles.RNHeader_right}
        onPress={() => {
          _setSuggest([]);
          navigation.goBack();
        }}>
        <Text>取消</Text>
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => null,
      headerLeft: () => <RNHeaderLeft />,
      headerRight: () => <RNHeaderRight />,
    });
  }, []);

  //------------------------------------------------------------------------------

  const goSearch = async (_prop: string) => {
    const resp: {data: {data: {items: SearchReault[]}}} = await axios.get('https://search.readhub.cn/api/entity/news', {
      params: {page: 1, seze: 20, query: _prop, type: 'hot'},
    });
    console.log(resp);
    setSearchResult(resp.data.data.items);
  };

  //------------------------------------------------------------------------------
  const renderSuggestList = ({item}: {item: SuggestItem}) => {
    return (
      <TouchableOpacity
        style={styles.suggest_list_touchable}
        onPress={() => {
          goSearch(item.entityName);
          // setSuggest([]);
        }}>
        <Ionicons name="search-circle" size={16} color={'rgba(0,0,0,0.2)'} />
        <Text style={styles.suggest_list_keyword}>{item.entityName}</Text>
      </TouchableOpacity>
    );
  };

  const renderCard = ({item}: {item: SearchReault}) => {
    return (
      <TouchableRipple borderless={true} style={styles.card} onPress={() => {}}>
        <View>
          <Text style={styles.card_title}>{item.topicTitle}</Text>
          <Text style={styles.caed_publishDate}>{dayjs(item.topicCreateAt).format('YYYY-MM-DD')}</Text>
          {item.topicSummary.length > 0 && (
            <Text numberOfLines={3} style={styles.card_summary}>
              {item.topicSummary}
            </Text>
          )}
          <View style={styles.card_bottom}>
            <View style={styles.card_bottom_left}>
              <Text numberOfLines={1} style={styles.card_siteName}>
                {'newsArray' in item && (
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
            <IconButton icon="share-variant" size={14} color="#FFFFFF" style={styles.card_iconbtn} onPress={() => {}} />
          </View>
        </View>
      </TouchableRipple>
    );
  };

  if (searchResult.length === 0) {
    return (
      <FlatList
        data={suggest}
        keyExtractor={(item, index: number) => index.toString()}
        renderItem={renderSuggestList}
        ItemSeparatorComponent={() => <View style={styles.suggest_list_separator} />}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  return (
    <FlatList
      data={searchResult}
      keyExtractor={(item, index: number) => index.toString()}
      renderItem={renderCard}
      ListHeaderComponent={() => <View style={styles.flatlist_header} />}
      ListFooterComponent={() => <View style={styles.flatlist_footer} />}
      ItemSeparatorComponent={() => <View style={styles.flatlist_separator} />}
    />
  );
};

const styles = StyleSheet.create({
  RNHeader_left: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginLeft: 8,
  },
  RNHeader_input: {
    width: screenWidth * 0.85 - 8,
    height: 32,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
  },
  RNHeader_right: {
    width: screenWidth * 0.15,
    alignItems: 'center',
  },

  suggest_list_touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
    paddingBottom: 16,
  },
  suggest_list_icon: {},
  suggest_list_keyword: {
    marginLeft: 8,
    includeFontPadding: false,
  },
  suggest_list_separator: {
    width: screenWidth - 16,
    height: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
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

export default Search;
