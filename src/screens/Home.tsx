import React, {useRef} from 'react';
import {View, StyleSheet, ListRenderItem} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {CollapsibleRef, MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import IcRoundShare from '../icons/IcRoundShare';

const DATA1 = [0, 1, 2, 3, 4];
const DATA2 = [5, 6, 7, 8, 9];
const DATA3 = [10, 11, 12, 13, 14];

type StackParamList = {
  Detail: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Home: React.FC = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  const tabRef = useRef<CollapsibleRef>();

  const renderItem: ListRenderItem<number> = React.useCallback(() => {
    return (
      <TouchableRipple
        borderless
        rippleColor={colors.ripple}
        style={[styles.item, {backgroundColor: colors.surface}]}
        onPress={() => navigation.navigate('Detail')}>
        <>
          <Text style={styles.title}>国家知识产权局依法打击恶意抢注冰墩墩、谷爱凌等商标注册</Text>
          <View style={styles.timestamp}>
            <Text style={styles.timestamp_emoji}>🕙</Text>
            <Text style={[styles.timestamp_text, {color: colors.textAccent}]}>17分钟前</Text>
          </View>
          <Text style={styles.summary}>
            国家知识产权局依据《奥林匹克标志保护条例》《商标法》第十条第一款第（八）项等规定，对 第 41128524
            号「冰墩墩」、第 62453532 号「谷爱凌」等 429 件商标注册申请予以驳回 ...
            依据《商标法》第四十四条第一款规定，对已注册的第 41126916 号「雪墩墩」、第 38770...
          </Text>
          <View style={styles.more}>
            <View style={styles.reporter}>
              <Text style={styles.reporter_emoji}>📰</Text>
              <Text style={[styles.reporter_text, {color: colors.textAccent}]}>钛媒体 报道</Text>
            </View>
            <TouchableRipple
              borderless
              rippleColor={colors.ripple}
              style={[styles.action, {backgroundColor: colors.ripple}]}
              onPress={() => {}}>
              <IcRoundShare size={14} color={colors.surface} />
            </TouchableRipple>
          </View>
        </>
      </TouchableRipple>
    );
  }, [colors, navigation]);

  return (
    <Tabs.Container
      ref={tabRef}
      headerContainerStyle={styles.header_container}
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          labelStyle={styles.tab_label}
          activeColor={colors.primary}
          indicatorStyle={[styles.tab_indicator, {backgroundColor: colors.primary}]}
          style={[styles.tab, {borderBottomColor: colors.background}]}
        />
      )}>
      <Tabs.Tab name="Topics" label="🔥热门话题">
        <Tabs.FlatList
          data={DATA1}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item + ''}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News" label="🚀科技动态">
        <Tabs.FlatList
          data={DATA2}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item + ''}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="🔨技术资讯">
        <Tabs.FlatList
          data={DATA3}
          renderItem={renderItem}
          ListHeaderComponent={() => <View />}
          ListHeaderComponentStyle={styles.list_header}
          ListFooterComponent={() => <View />}
          ListFooterComponentStyle={{height: insets.bottom + 12}}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
          keyExtractor={item => item + ''}
          showsVerticalScrollIndicator={false}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  header_container: {
    shadowOpacity: 0,
    elevation: 0,
  },
  tab: {
    borderBottomWidth: 1,
  },
  tab_label: {
    fontWeight: 'bold',
    margin: 0,
  },
  tab_indicator: {
    height: 0,
  },
  list_header: {
    height: 12,
  },
  item_separator: {
    height: 12,
  },
  item: {
    marginLeft: 14,
    marginRight: 14,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  timestamp: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp_emoji: {
    fontSize: 12,
  },
  timestamp_text: {
    marginLeft: 2,
    fontSize: 12,
  },
  summary: {
    marginTop: 24,
    fontSize: 15,
    textAlign: 'justify',
  },
  more: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reporter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reporter_emoji: {
    fontSize: 12,
  },
  reporter_text: {
    marginLeft: 2,
    fontSize: 12,
  },
  action: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 2,
  },
});

export default Home;
