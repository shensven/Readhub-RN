import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useLayoutEffect, useState} from 'react';
import {SearchReault} from './type';

interface SuggestItem {
  entityId: string;
  entityName: string;
  entityType: string;
  text: string;
  type: string;
}

interface SearchType {
  input: string;
  setInput: Function;
  suggest: SuggestItem[];
  setSuggest: Function;
  searchResult: SearchReault[];
  setSearchResult: Function;
  hasLoading: boolean;
  setHasLoading: Function;
  listHasRead: string[];
  setListHasRead: Function;
}

export const ReadhubCtx = createContext<SearchType>({
  input: '',
  setInput: () => null,
  suggest: [] as SuggestItem[],
  setSuggest: () => null,
  searchResult: [] as SearchReault[],
  setSearchResult: () => null,
  hasLoading: false,
  setHasLoading: () => null,
  listHasRead: [] as string[],
  setListHasRead: () => null,
});

export const ReadhubProvider: React.FC = props => {
  const [inputVal, setInputVal] = useState<string>('');
  const [suggestVal, setSuggestVal] = useState<SuggestItem[]>([]);
  const [searchResultVal, setSearchResultVal] = useState<SearchReault[]>([]);
  const [hasLoadingVal, setHasLoadingVal] = useState<boolean>(false);
  const [listHasReadVal, setListHasReadVal] = useState<string[]>([]);

  const initListHasRead = async () => {
    if (listHasReadVal.length === 0) {
      const resp = await AsyncStorage.getItem('@listHasRead');
      setListHasReadVal(resp ? JSON.parse(resp) : []);
    }
  };

  const persistListHasRead = async () => {
    const jsonVal: string = JSON.stringify([...listHasReadVal]);
    await AsyncStorage.setItem('@listHasRead', jsonVal);
  };

  useLayoutEffect(() => {
    initListHasRead();
  }, []);

  useLayoutEffect(() => {
    persistListHasRead();
  }, [listHasReadVal]);

  const ctxValue = {
    input: inputVal,
    setInput: (str: string) => setInputVal(str),
    suggest: suggestVal,
    setSuggest: (arr: SuggestItem[]) => setSuggestVal([...arr]),
    searchResult: searchResultVal,
    setSearchResult: (arr: SearchReault[]) => setSearchResultVal([...arr]),
    hasLoading: hasLoadingVal,
    setHasLoading: (prop: boolean) => setHasLoadingVal(prop),
    listHasRead: listHasReadVal,
    setListHasRead: (arr: string[]) => setListHasReadVal([...arr]),
  };

  return <ReadhubCtx.Provider value={ctxValue}>{props.children}</ReadhubCtx.Provider>;
};
