import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers();

jest.doMock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    show: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});
