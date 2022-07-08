import React from 'react';
import {Dimensions, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import coreColor from '../utils/coreColor';

const screenHeight = Dimensions.get('screen').height;

const Aouut: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingBottom: insets.bottom}}>
      <View
        style={{
          alignItems: 'center',
          height: screenHeight * 0.75,
        }}>
        <Avatar.Image
          size={68}
          source={require('../assets/appIcon/AppIconAlpha.png')}
          style={{marginTop: 40, marginBottom: 8}}
          theme={{
            colors: {primary: 'transparent'},
          }}
        />
        <Text style={{fontWeight: 'bold', color: coreColor.primary}}>SvenFE implementation of Readhub</Text>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: coreColor.onBackground, marginTop: 4}}>
          Version 2.0.0(1)
        </Text>
      </View>
      <View style={{alignItems: 'center', marginBottom: 8}}>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: coreColor.onBackground, marginTop: 8}}>
          Salute to https://readhub.cn
        </Text>
        <Text style={{fontSize: 10, fontWeight: 'bold', color: coreColor.onBackground, marginTop: 8}}>
          Powered by React Native
        </Text>
      </View>
    </View>
  );
};

export default Aouut;
