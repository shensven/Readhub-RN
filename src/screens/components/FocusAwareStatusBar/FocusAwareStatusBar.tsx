import React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

interface FocusAwareStatusBarProps {
  translucent?: boolean;
  backgroundColor?: string;
  barStyle?: string;
}

const FocusAwareStatusBar: React.FC<FocusAwareStatusBarProps> = (props: any) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
