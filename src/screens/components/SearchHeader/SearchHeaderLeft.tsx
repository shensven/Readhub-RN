import React, {useContext} from 'react';
import {Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {useTheme as usePaperTheme} from 'react-native-paper';
import axios from 'axios';
import {ReadhubnCtx} from '../../../utils/readhubnContext';
import {SearchReault, SuggestItem} from '../../../utils/type';

const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

const SearchHeaderLeft: React.FC = () => {
  const {colors: paperColor} = usePaperTheme();

  const {input, setInput, setSuggest, setHasLoading, setSearchResult, setSearchResultPage} = useContext(ReadhubnCtx);

  const goSearch = async (_prop: string) => {
    const resp: {data: {data: {items: SearchReault[]}}} = await axios.get('https://search.readhub.cn/api/entity/news', {
      params: {page: 1, seze: 20, query: _prop, type: 'hot'},
    });
    // console.log('goSearch', resp);
    setSearchResult(resp.data.data.items);
  };

  const getSuggest = async () => {
    if (input.length > 0) {
      const resp: {data: {result: {data: {items: SuggestItem[]}}}} = await axios.get(
        'https://search.readhub.cn/api/entity/suggest',
        {params: {q: input}},
      );
      if (resp.data.result.data.items.length === 0) {
        setHasLoading(true);
        goSearch(input);
        return;
      }
      setSuggest(resp.data.result.data.items);
    }
  };

  return (
    <View style={[styles.RNHeader_left, {backgroundColor: paperColor.rippleAccent}]}>
      <TextInput
        autoFocus={true}
        placeholder="搜索"
        value={input}
        placeholderTextColor={paperColor.textAccent}
        selectionColor={paperColor.primary}
        style={styles.RNHeader_input}
        onChangeText={text => setInput(text)}
        onSubmitEditing={() => getSuggest()}
        onFocus={() => {
          setHasLoading(false);
          setSearchResult([]);
          setSearchResultPage(2);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  RNHeader_left: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  RNHeader_input: {
    width: screenWidth * 0.85 - 8,
    height: 28,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default SearchHeaderLeft;
