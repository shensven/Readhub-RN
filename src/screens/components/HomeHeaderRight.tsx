import React from 'react';
import {Platform, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {IconButton, useTheme} from 'react-native-paper';
import IcRoundSearch from '../../assets/icons/IcRoundSearch';
import IcRoundMoreHoriz from '../../assets/icons/IcRoundMoreHoriz';
import IcRoundMoreVert from '../../assets/icons/IcRoundMoreVert';

type StackParamList = {
  Search: undefined;
  Settings: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const HomeHeaderRight: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const {colors} = useTheme();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <IconButton
        icon={() => <IcRoundSearch color={colors.onBackground} />}
        onPress={() => navigation.navigate('Search')}
      />
      <IconButton
        icon={() =>
          Platform.OS === 'ios' ? (
            <IcRoundMoreHoriz color={colors.onBackground} />
          ) : (
            <IcRoundMoreVert color={colors.onBackground} />
          )
        }
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default HomeHeaderRight;
