import React, {useLayoutEffect, useState} from 'react';
import {View, useWindowDimensions, StyleSheet, ScrollView} from 'react-native';
import {Text, useTheme as usePaperTheme} from 'react-native-paper';
import FocusAwareStatusBar from './components/FocusAwareStatusBar/FocusAwareStatusBar';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appAxios from '../utils/appAxios';
import {InstantState} from '../utils/type';

type StackParamList = {
  Params: {
    id: string;
    title: string;
    summary: string;
    publishDate: string;
  };
};

type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

const Instant: React.FC = () => {
  const insets = useSafeAreaInsets();

  const {width} = useWindowDimensions();
  const {colors: paperColor} = usePaperTheme();

  const route = useRoute<ScreenRouteProp>();

  const [instant, setInstant] = useState<InstantState>({
    content: '',
    siteName: '',
    title: '',
    url: '',
  });

  const getInstant = async () => {
    const resp: any = await appAxios.get('https://api.readhub.cn/topic/instantview', {
      params: {topicId: route.params.id},
    });
    // console.log('getInstant', resp.data);
    setInstant(resp.data);
  };

  useLayoutEffect(() => {
    getInstant();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.root, {paddingBottom: insets.bottom + 16}]}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" />
      <Text style={{color: paperColor.textAccent}}>来源{' ' + instant.siteName}</Text>
      <View style={[styles.header_divider, {backgroundColor: paperColor.ripple}]} />
      <Text style={styles.title}>{instant.title}</Text>
      <RenderHtml contentWidth={width - 32} source={{html: instant.content}} />
      <View style={[styles.bottom]}>
        <View style={[styles.divider, {backgroundColor: paperColor.ripple}]} />
        <Ionicons name="glasses-outline" size={24} color={paperColor.ripple} />
        <View style={[styles.divider, {backgroundColor: paperColor.ripple}]} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  header_divider: {
    height: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  // content: {},
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '42%',
  },
});

export default Instant;
