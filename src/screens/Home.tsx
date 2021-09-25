import React from 'react';
import {Text, View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

const Home: React.FC = () => {
  const renderCard = () => {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  };
  return (
    <Tabs.Container>
      <Tabs.Tab name="Topics">
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      </Tabs.Tab>
      <Tabs.Tab name="News">
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      </Tabs.Tab>
      <Tabs.Tab name="Tech">
        <Tabs.FlatList
          data={[0, 1, 2, 3, 4]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default Home;
