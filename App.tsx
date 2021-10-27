import React, {useContext, useMemo} from 'react';
import {Platform, StatusBar, StyleSheet, ToastAndroid, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Provider as PaperProvider, Text, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNBootSplash from 'react-native-bootsplash';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import {ReadhubnCtx, ReadhubProvider} from './src/utils/readhubnContext';
import {paperLight} from './src/theme/default';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import DetailTopic from './src/screens/DetailTopic';
import DetailNews from './src/screens/DetailNews';
import Instant from './src/screens/Instant';
import Settings from './src/screens/Settings';
import Welcome from './src/screens/Welcome';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import OpenSourceLibraries from './src/screens/OpenSourceLibraries';
import About from './src/screens/About';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {colors: paperColor} = usePaperTheme();
  const {listHasRead, setListHasRead, bottomSheetModalRef, shareURL, setShareURL} = useContext(ReadhubnCtx);

  const snapPoints = useMemo(() => [128 + insets.bottom], []);

  const handleBottomSheetOnChange = (snapPoint: number) => {
    if (snapPoint === -1) {
      setShareURL('');
    }
  };

  const initListHasRead = async () => {
    if (listHasRead.length === 0) {
      const resp = await AsyncStorage.getItem('@listHasRead');
      setListHasRead(resp ? JSON.parse(resp) : []);
    }
  };

  return (
    <NavigationContainer
      onReady={() =>
        setTimeout(() => {
          initListHasRead();
          RNBootSplash.hide({fade: true});
        }, 200)
      }>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Stack.Navigator
        detachInactiveScreens={!__DEV__}
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: paperColor.blueText,
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
          },
          cardOverlayEnabled: true,
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DetailTopic" component={DetailTopic} />
        <Stack.Screen name="DetailNews" component={DetailNews} />
        <Stack.Screen name="Instant" component={Instant} options={{...TransitionPresets.ModalPresentationIOS}} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Welcome" component={Welcome} options={{...TransitionPresets.ModalSlideFromBottomIOS}} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="OpenSourceLibraries" component={OpenSourceLibraries} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={backdropProps => <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />}
        style={styles.bottom_sheet_container}
        onChange={snapPoint => handleBottomSheetOnChange(snapPoint)}>
        <BottomSheetView style={styles.bottom_sheet}>
          <BottomSheetView style={styles.bottom_sheet_btn}>
            <TouchableOpacity
              style={styles.bottom_sheet_icon}
              onPress={() => {
                Clipboard.setString(shareURL);
                bottomSheetModalRef.current?.close();
                Platform.OS === 'android' && ToastAndroid.show('已复制', ToastAndroid.SHORT);
              }}>
              <Ionicons name="link-outline" size={24} />
            </TouchableOpacity>
            <Text style={styles.bottom_sheet_label}>复制链接</Text>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bottom_sheet_container: {
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.75,
    shadowRadius: 16.0,
    elevation: 24,
  },
  bottom_sheet: {
    flexDirection: 'row',
  },
  bottom_sheet_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
  },
  bottom_sheet_icon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128,128,128,0.1)',
  },
  bottom_sheet_label: {
    fontSize: 12,
    marginTop: 4,
    color: 'rgba(0,0,0,0.5)',
  },
});

export default () => (
  <ReadhubProvider>
    <SafeAreaProvider>
      <PaperProvider theme={paperLight}>
        <BottomSheetModalProvider>
          <App />
        </BottomSheetModalProvider>
      </PaperProvider>
    </SafeAreaProvider>
  </ReadhubProvider>
);
