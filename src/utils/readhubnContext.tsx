import React, {createContext, RefObject, useRef, useState} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {SearchReault} from './type';

interface SuggestItem {
  entityId: string;
  entityName: string;
  entityType: string;
  text: string;
  type: string;
}

interface CtxType {
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
  bottomSheetModalRef: RefObject<BottomSheetModalMethods>;
  shareURL: string;
  setShareURL: Function;
}

export const ReadhubnCtx = createContext<CtxType>({
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
  bottomSheetModalRef: null as any,
  shareURL: '',
  setShareURL: () => null,
});

export const ReadhubProvider: React.FC = props => {
  const [inputVal, setInputVal] = useState<string>('');
  const [suggestVal, setSuggestVal] = useState<SuggestItem[]>([]);
  const [searchResultVal, setSearchResultVal] = useState<SearchReault[]>([]);
  const [hasLoadingVal, setHasLoadingVal] = useState<boolean>(false);
  const [listHasReadVal, setListHasReadVal] = useState<string[]>([]);
  const [shareURLVal, setShareURLVal] = useState<string>('');

  const bottomSheetModalRefVal = useRef<BottomSheetModal>(null);

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
    bottomSheetModalRef: bottomSheetModalRefVal,
    shareURL: shareURLVal,
    setShareURL: (str: string) => setShareURLVal(str),
  };

  return <ReadhubnCtx.Provider value={ctxValue}>{props.children}</ReadhubnCtx.Provider>;
};
