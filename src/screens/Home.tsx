import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Topics: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Text>T</Text>
      </ScrollView>
    </View>
  );
};

const News: React.FC = () => {
  return (
    <View>
      <Text>N</Text>
    </View>
  );
};

const Tech: React.FC = () => {
  return (
    <View>
      <Text>N</Text>
    </View>
  );
};

const Home: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Topics" component={Topics} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Tech" component={Tech} />
    </Tab.Navigator>
  );
};

export default Home;
