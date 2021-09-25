import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
import {View as mockView} from 'react-native';

jest.mock('react-native-tab-view', () => ({TabView: mockView}));
