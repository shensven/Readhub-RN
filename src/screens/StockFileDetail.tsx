import React, {useLayoutEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Button, Text, useTheme} from 'react-native-paper';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {AxiosResponse} from 'axios';
import feedAxios from '../utils/feedAxios';
import Loading from '../animation/Loading/Loading';
import FluentDocumentPdf32Regular from '../icons/FluentDocumentPdf32Regular';

dayjs.locale('zh-cn');

const screenHeight = Dimensions.get('screen').height;

type StackParamList = {
  Params: {id: string};
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

interface IDetail {
  companyNameFull: string;
  fileTypeStr: string;
  fileTagsDisplay: string[];
  fileNameDisplay: string;
  exchangeDisplay: string;
  publishDate: string;
}

const StockFileDetail: React.FC = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<ScreenRouteProp>();
  const {id} = route.params;

  const [hasLoading, setHasloading] = useState<boolean>(true);
  const [detail, setDetail] = useState<IDetail>({
    companyNameFull: '',
    fileTypeStr: '',
    fileTagsDisplay: [],
    fileNameDisplay: '',
    exchangeDisplay: '',
    publishDate: '',
  });

  const getDetail = async () => {
    const resp: AxiosResponse = await feedAxios.get('/stock_file/detail/', {params: {id}});
    console.log('getDetail', resp.data);
    if (resp.status === 200) {
      setHasloading(false);
      setDetail(resp.data.data.items[0]);
    }
  };

  useLayoutEffect(() => {
    getDetail();
  }, []);

  return hasLoading ? (
    <View style={{marginTop: screenHeight / 4}}>
      <Loading />
    </View>
  ) : (
    <ScrollView>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.ripple,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 16,
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <View style={{marginTop: 40}}>
          <FluentDocumentPdf32Regular size={56} color="#CD534B" />
        </View>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 24}}>{detail.companyNameFull}</Text>
        <Text style={{fontWeight: 'bold', marginTop: 8}}>{detail.fileTypeStr}</Text>
        <View style={{flexDirection: 'row', marginTop: 24}}>
          {detail.fileTagsDisplay.map((tag, index) => (
            <Text
              key={index}
              style={{
                color: '#E55C5C',
                backgroundColor: '#F9E4E0',
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                marginLeft: 4,
                marginRight: 4,
                borderRadius: 4,
              }}>
              {tag}
            </Text>
          ))}
        </View>
        <Text style={{marginTop: 72, marginLeft: 6, color: colors.textAccent}}>{detail.fileNameDisplay}</Text>
        <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 40}}>
          <Text style={{color: colors.textAccent, marginRight: 8}}>{detail.exchangeDisplay}</Text>
          <Text style={{color: colors.textAccent}}>{dayjs(detail.publishDate).format('YYYY-MM-DD')}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 16, marginBottom: 16 + insets.bottom}}>
        <Button mode="outlined" style={{flex: 1, marginLeft: 20, marginRight: 8}} onPress={() => {}}>
          下载文件
        </Button>
        <Button mode="contained" style={{flex: 1, marginLeft: 8, marginRight: 20}} onPress={() => {}}>
          查看文件
        </Button>
      </View>
    </ScrollView>
  );
};

export default StockFileDetail;
