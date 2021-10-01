import React, {useLayoutEffect} from 'react';
import {Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type StackParamList = {
  Params: {
    id: string;
    title: string;
    summary: string;
    publishDate: string;
  };
  Instant: undefined;
};

type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

type Props = StackScreenProps<StackParamList, 'Instant'>;

type ScreenNavigationProp = Props['navigation'];

const Summary: React.FC = () => {
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '话题详情',
      cardStyle: {
        backgroundColor: '#FFFFFF',
      },
    });
  }, [navigation, route]);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{route.params.title}</Text>
      <Text style={styles.publishDate}>{dayjs(route.params.publishDate).fromNow()}</Text>
      <Text selectable={true} style={styles.summary}>
        {route.params.summary}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Instant')}>
        <Text>即时预览</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  publishDate: {
    marginTop: 8,
  },
  summary: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 32,
  },
});

export default Summary;
