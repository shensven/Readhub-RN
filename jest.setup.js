import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
import {View as mockView} from 'react-native';

global.__reanimatedWorkletInit = jest.fn();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  //   Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-tab-view', () => {
  return {
    TabView: mockView,
  };
});

jest.doMock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    show: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.useFakeTimers();
