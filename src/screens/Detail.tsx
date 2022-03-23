import React, {useLayoutEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, useTheme} from 'react-native-paper';
import {AxiosResponse} from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import IcRoundOpenInNew from '../icons/IcRoundOpenInNew';
import feedAxios from '../utils/feedAxios';
import {ScrollView} from 'react-native-gesture-handler';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

type StackParamList = {
  Params: {id: string};
  Detail: {id: string};
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

interface IDetail {
  title: string;
  publishDate: string;
  summary: string;
  newsArray: {
    title: string;
    siteName: string;
  }[];
  timeline: {
    topics: {
      id: string;
      title: string;
      createdAt: string;
    }[];
  };
}

const Detail: React.FC = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();
  const {id} = route.params;

  const [detail, setDetail] = useState<IDetail>({
    title: '',
    publishDate: '',
    summary: '',
    newsArray: [],
    timeline: {
      topics: [],
    },
  });

  const getDetail = async () => {
    const resp: AxiosResponse = await feedAxios.get(`/topic/${id}`);
    console.log('getDetail', resp.data);
    setDetail(resp.data);
  };

  useLayoutEffect(() => {
    getDetail();
  }, []);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: insets.bottom}}>
      <View style={{margin: 20}}>
        <Text selectable style={{fontSize: 20, fontWeight: 'bold', lineHeight: 20 * 1.5}}>
          {detail.title}
        </Text>
        {detail.publishDate.length > 0 && (
          <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12}}>🕙</Text>
            <Text style={{marginLeft: 4, color: colors.textAccent}}>{dayjs(detail.publishDate).fromNow()}</Text>
          </View>
        )}
        <Text selectable style={{marginTop: 20, fontSize: 16, textAlign: 'justify', lineHeight: 15 * 2}}>
          {detail.summary}
        </Text>

        {detail.newsArray?.length > 0 && (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 4}}>
              <Text style={{fontSize: 12}}>🔗</Text>
              <Text style={{marginLeft: 8, fontSize: 16, fontWeight: 'bold'}}>媒体报道</Text>
            </View>
            <View>
              {detail.newsArray.map((item, index) => (
                <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                  <Text>・</Text>
                  <View style={{flex: 1}}>
                    <TouchableOpacity>
                      <Text style={{fontSize: 13, lineHeight: 13 * 1.5}}>
                        {item.title} <IcRoundOpenInNew size={13} color={colors.textAccent} />
                      </Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 2, fontSize: 10, color: colors.textAccent}}>{item.siteName}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
        {detail.timeline?.topics.length > 0 && (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 4}}>
              <Text style={{fontSize: 12}}>📰</Text>
              <Text style={{marginLeft: 8, fontSize: 16, fontWeight: 'bold'}}>相关事件</Text>
            </View>
            <View>
              {detail.timeline.topics.map((item, index) => (
                <View key={index} style={{flexDirection: 'row', marginTop: 12}}>
                  <Text>・</Text>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      disabled={id === item.id}
                      onPress={() => navigation.push('Detail', {id: item.id})}>
                      <Text
                        style={{
                          color: id === item.id ? colors.textAccent : colors.text,
                          fontSize: 13,
                          lineHeight: 13 * 1.5,
                        }}>
                        {item.title}
                        {id === item.id && <Text style={{color: colors.primary}}>（正在阅读）</Text>}
                      </Text>
                    </TouchableOpacity>
                    <Text style={{marginTop: 2, fontSize: 10, color: colors.textAccent}}>
                      {dayjs(item.createdAt).format('YYYY-MM-DD')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Detail;
