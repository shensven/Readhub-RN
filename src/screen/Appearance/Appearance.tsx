import React from 'react';
import {ScrollView, View} from 'react-native';
import color from 'color';
import {Text, TouchableRipple} from 'react-native-paper';
import {IcRoundCheck} from '@/component/Icon';
import {useAppearance} from '@/utils/appearance';

function Appearance() {
  const {themeScheme, paperTheme, setAppearance} = useAppearance();

  const appearances = [
    {
      label: '浅色',
      value: 'light',
      onPress: () => setAppearance('light'),
    },
    {
      label: '深色',
      value: 'dark',
      onPress: () => setAppearance('dark'),
    },
    {
      label: '跟随系统',
      value: 'system',
      onPress: () => setAppearance('system'),
    },
  ];

  return (
    <ScrollView>
      <View style={{marginVertical: 16, marginHorizontal: 20, borderRadius: 16, overflow: 'hidden'}}>
        {appearances.map((item, index) => (
          <TouchableRipple key={item.label + index} onPress={item.onPress}>
            <View
              style={{
                height: 56,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: color(paperTheme.colors.secondary).alpha(0.05).hexa(),
              }}>
              <Text style={{color: paperTheme.colors.onSurface, includeFontPadding: false}}>{item.label}</Text>
              {themeScheme === item.value && <IcRoundCheck width={20} height={20} color={paperTheme.colors.primary} />}
            </View>
          </TouchableRipple>
        ))}
      </View>
    </ScrollView>
  );
}

export default Appearance;
