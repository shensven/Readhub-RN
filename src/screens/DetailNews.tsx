import React, {useLayoutEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconButton, Text, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

type StackParamList = {
  Params: {
    id: string;
    title: string;
    publishDate: string;
    summary: string;
    hasInstantView?: boolean;
  };
  Instant: {
    id: string;
  };
};

type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const DetailNews: React.FC = () => {
  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  const insets = useSafeAreaInsets();
  const {colors: paperColor} = usePaperTheme();

  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const {id, title, publishDate, summary, hasInstantView} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '话题详情',
      headerBackTitle: '返回',
      cardStyle: {backgroundColor: '#FFFFFF'},
    });
  }, [navigation, route]);

  return (
    <ScrollView
      scrollIndicatorInsets={{right: 1}}
      contentContainerStyle={[styles.root, {paddingBottom: insets.bottom + 24}]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.publishDate, {color: paperColor.textAccent}]}>{dayjs(publishDate).fromNow()}</Text>
      <Text selectable={true} style={styles.summary}>
        {summary}
      </Text>
      <View style={styles.mid}>
        {hasInstantView ? (
          <TouchableRipple
            borderless={true}
            rippleColor={paperColor.instantRipple}
            style={[styles.instant, {backgroundColor: paperColor.instantRipple}]}
            onPress={() => navigation.navigate('Instant', {id})}>
            <>
              <Ionicons name="glasses-outline" size={24} color={paperColor.instantText} />
              <Text style={[styles.instant_label, {color: paperColor.instantText}]}>即时预览</Text>
            </>
          </TouchableRipple>
        ) : (
          <View />
        )}
        <IconButton
          icon="share-variant"
          size={14}
          color="#FFFFFF"
          rippleColor={paperColor.ripple}
          style={[styles.iconbtn, {backgroundColor: paperColor.ripple}]}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 27,
    textAlign: 'justify',
  },
  publishDate: {
    marginTop: 8,
  },
  summary: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 32,
    textAlign: 'justify',
  },
  mid: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instant: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  instant_label: {
    includeFontPadding: false,
    marginLeft: 4,
  },
  iconbtn: {
    paddingRight: 2,
  },
});

export default DetailNews;
