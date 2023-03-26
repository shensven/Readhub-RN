import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

function Loading() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <LottieView source={require('./Bodymovin_export/data.json')} autoPlay loop style={{width: 36, height: 36}} />
    </View>
  );
}

export default Loading;
