import React, {createContext, useState} from 'react';
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
}

export const SearchCtx = createContext<SearchType>({
  input: '',
  setInput: () => null,
  suggest: [] as SuggestItem[],
  setSuggest: () => null,
  searchResult: [] as SearchReault[],
  setSearchResult: () => null,
  hasLoading: false,
  setHasLoading: () => null,
});

export const SearchProvider: React.FC = props => {
  const [inputVal, setInputVal] = useState<string>('');
  const [suggestVal, setSuggestVal] = useState<SuggestItem[]>([]);
  const [searchResultVal, setSearchResultVal] = useState<SearchReault[]>([]);
  const [hasLoadingVal, setHasLoadingVal] = useState<boolean>(false);

  const ctxValue = {
    input: inputVal,
    setInput: (str: string) => {
      setInputVal(str);
    },
    suggest: suggestVal,
    setSuggest: (arr: SuggestItem[]) => {
      setSuggestVal([...arr]);
    },
    searchResult: searchResultVal,
    setSearchResult: (arr: SearchReault[]) => {
      setSearchResultVal([...arr]);
    },
    hasLoading: hasLoadingVal,
    setHasLoading: (prop: boolean) => {
      setHasLoadingVal(prop);
    },
  };
  return <SearchCtx.Provider value={ctxValue}>{props.children}</SearchCtx.Provider>;
};
