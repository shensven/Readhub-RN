import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const RNHeaderRight: React.FC = () => {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ReadHubn',
      headerRight: () => <RNHeaderRight />,
    });
  }, [navigation, route]);

  //----------------------------------------------------------------------------

  const renderCard = () => {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  };

  return (
    <Tabs.Container
      renderTabBar={props => (
        <MaterialTabBar
          {...props}
          scrollEnabled
          // activeColor={PaperColor.text}
          // inactiveColor={PaperColor.textAccent}
          indicatorStyle={
            {
              // backgroundColor: PaperColor.accent,
            }
          }
          labelStyle={styles.tab_label}
          style={
            {
              // backgroundColor: PaperColor.cardBackground,
            }
          }
        />
      )}>
      <Tabs.Tab name="Topics" label="热门话题">
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News" label="科技动态">
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech" label="技术咨询">
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  root: {},
  tab_label: {
    fontWeight: 'bold',
  },
});

export default Home;
