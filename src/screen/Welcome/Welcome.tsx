import React from 'react';
import {View, Image, Dimensions} from 'react-native';

function Welcome() {
  const screenHeight = Dimensions.get('screen').height;

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('@/assets/splash/bootsplash.png')}
        style={{marginTop: screenHeight / 2 - 96, width: 192, height: 192}}
      />
    </View>
  );
}

export default Welcome;
