import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

const Topics: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text>T</Text>
        <Text>T</Text>
        <Text>T</Text>
        <Text>T</Text>
        <Text>T</Text>
        <Text>T</Text>
        <Text>T</Text>
        <Text>T</Text>
      </ScrollView>
    </View>
  );
};

const News: React.FC = () => {
  return (
    <View>
      <Text>N</Text>
      <Text>N</Text>
      <Text>N</Text>
      <Text>N</Text>
      <Text>N</Text>
      <Text>N</Text>
      <Text>N</Text>
      <Text>N</Text>
    </View>
  );
};

const Tech: React.FC = () => {
  return (
    <View>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
      <Text>T</Text>
    </View>
  );
};

const Home: React.FC = () => {
  return (
    <Tabs.Container>
      <Tabs.Tab name="Topics">
        <Topics />
      </Tabs.Tab>
      <Tabs.Tab name="News">
        <News />
      </Tabs.Tab>
      <Tabs.Tab name="Tech">
        <Tech />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default Home;
