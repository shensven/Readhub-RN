import React from 'react';
import {ScrollView, View} from 'react-native';
import color from 'color';
import {Text, TouchableRipple, useTheme} from 'react-native-paper';
import {IcRoundCheck} from '@/component/icon';
import {useAppearance} from '@/utils/appearance';

function Appearance() {
  const {colors} = useTheme();
  const {themeScheme, setAppearance} = useAppearance();

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
      <View style={{margin: 16}}>
        {appearances.map((item, index) => (
          <TouchableRipple
            key={item.label}
            borderless
            style={{
              borderTopLeftRadius: index === 0 ? 16 : 0,
              borderTopRightRadius: index === 0 ? 16 : 0,
              borderBottomLeftRadius: index === appearances.length - 1 ? 16 : 0,
              borderBottomRightRadius: index === appearances.length - 1 ? 16 : 0,
            }}
            onPress={item.onPress}>
            <View
              style={{
                height: 56,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: color(colors.secondary).alpha(0.05).toString(),
              }}>
              <Text style={{color: colors.onSurfaceVariant, includeFontPadding: false}}>{item.label}</Text>
              {themeScheme === item.value && <IcRoundCheck size={18} color={colors.primary} />}
            </View>
          </TouchableRipple>
        ))}
      </View>
    </ScrollView>
  );
}

export default Appearance;
