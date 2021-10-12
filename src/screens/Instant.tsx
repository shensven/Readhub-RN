import React, {useLayoutEffect, useState} from 'react';
import {View, Text, useWindowDimensions, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appAxios from '../utils/appAxios';

interface Instant {
  content: string;
  siteName: string;
  title: string;
  url: string;
}

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
  const {width} = useWindowDimensions();

  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

  const [instant, setInstant] = useState<Instant>({
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
  }, [navigation, route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '即时预览',
      cardStyle: {backgroundColor: '#FFFFFF'},
    });
  }, [navigation, route]);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text>来源{' ' + instant.siteName}</Text>
      <View style={styles.header_divider} />
      <Text style={styles.title}>{instant.title}</Text>
      <RenderHtml contentWidth={width - 32} source={{html: instant.content}} />
      <View style={styles.bottom}>
        <View style={styles.divider} />
        <Ionicons name="glasses-outline" size={24} color="rgba(0,0,0,0.1)" />
        <View style={styles.divider} />
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  content: {},
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    width: '42%',
  },
});

export default Instant;
