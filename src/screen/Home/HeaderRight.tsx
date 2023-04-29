import React, {useCallback} from 'react';
import {Platform, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {useAppearance} from '@/utils/appearance';
import {IcRoundMoreHoriz, IcRoundMoreVert, IcRoundSearch} from '@/component/Icon';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

function HeaderRight() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {navigationTheme} = useAppearance();

  const IconButtonSearch = useCallback(
    () => <IcRoundSearch color={navigationTheme.colors.text} width={24} height={24} />,
    [navigationTheme.dark],
  );

  const IconButtonMore = useCallback(
    () => (
      <>
        {Platform.OS === 'ios' && <IcRoundMoreHoriz color={navigationTheme.colors.text} width={24} height={24} />}
        {Platform.OS === 'android' && <IcRoundMoreVert color={navigationTheme.colors.text} width={24} height={24} />}
      </>
    ),
    [navigationTheme.dark],
  );

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <IconButton icon={IconButtonSearch} onPress={() => navigation.navigate('Search')} />
      <IconButton icon={IconButtonMore} onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

export default HeaderRight;
