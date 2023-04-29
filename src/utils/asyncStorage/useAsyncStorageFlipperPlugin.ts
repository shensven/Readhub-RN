import {useEffect} from 'react';
import {addPlugin} from 'react-native-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorageFlipperPlugin = () => {
  const getAsyncStorageContent = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      const localStorageContent = await Promise.all(
        keys.map(async key => {
          const value = await AsyncStorage.getItem(key);
          return {id: key, content: value};
        }),
      );
      return localStorageContent;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    addPlugin({
      getId() {
        return 'FlipperAsyncStorageAdvanced';
      },
      onConnect(connection) {
        connection.receive('clear', async () => {
          await AsyncStorage.clear();
          const asyncStorageContent = await getAsyncStorageContent();
          connection.send('newData', asyncStorageContent);
        });

        connection.receive('refresh', async () => {
          const asyncStorageContent = await getAsyncStorageContent();
          connection.send('newData', asyncStorageContent);
        });

        connection.receive('update', async data => {
          await AsyncStorage.clear();
          data.value.forEach((dataItem: any) => {
            console.log(dataItem);
            AsyncStorage.setItem(dataItem.id, dataItem.content);
          });
        });

        const loadInitialData = async () => {
          const asyncStorageContent = await getAsyncStorageContent();
          connection.send('newData', asyncStorageContent);
        };
        loadInitialData();
      },
      onDisconnect() {},
    });
  }, []);
};

export default useAsyncStorageFlipperPlugin;
