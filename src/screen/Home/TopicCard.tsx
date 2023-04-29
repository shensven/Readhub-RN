import React from 'react';
import color from 'color';
import {View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {useAppearance} from '@/utils/appearance';
import {IcRoundShare} from '@/component/Icon';
import type {Feed} from './Home';

type Props = {
  title: Feed['title'];
  publishDate: Feed['publishDate'];
  summary: Feed['summary'];
  newsArray: Feed['newsArray'];
  onPress: () => void;
};

function TopicCard(props: Props) {
  const {title, publishDate, summary, newsArray, onPress} = props;

  const {colors} = useAppearance().paperTheme;

  return (
    <TouchableRipple borderless style={{marginHorizontal: 16, borderRadius: 16}} onPress={onPress}>
      <View
        style={{
          padding: 16,
          backgroundColor: color(colors.secondary).alpha(0.12).hexa(),
        }}>
        <Text
          variant="titleLarge"
          style={{
            marginHorizontal: 4,
            fontWeight: 'bold',
            textAlign: 'justify',
            color: color(colors.onSurface).alpha(0.9).hexa(),
          }}>
          {title}
        </Text>
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            height: 24,
            marginTop: 8,
            paddingHorizontal: 8,
            borderRadius: 8,
            backgroundColor: colors.surface,
          }}>
          <Text variant="bodySmall">🕙</Text>
          <Text variant="bodySmall" style={{marginLeft: 4, color: color(colors.secondary).alpha(0.7).hexa()}}>
            {publishDate}
          </Text>
        </View>
        <Text
          numberOfLines={5}
          variant="bodyMedium"
          style={{
            marginTop: 8,
            marginHorizontal: 4,
            textAlign: 'justify',
            lineHeight: 15 * 1.8,
            color: color(colors.onSurface).alpha(0.8).hexa(),
          }}>
          {summary}
        </Text>
        <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 24,
              paddingHorizontal: 8,
              borderRadius: 8,
              backgroundColor: colors.surface,
            }}>
            {newsArray.length === 1 && (
              <Text variant="bodySmall" style={{color: color(colors.secondary).alpha(0.7).hexa()}}>
                {newsArray[0].siteName + ' 报道'}
              </Text>
            )}
            {newsArray.length > 1 && (
              <Text variant="bodySmall" style={{color: color(colors.secondary).alpha(0.7).hexa()}}>
                {newsArray[0].siteName + ' 等 ' + newsArray.length + ' 家媒体报道'}
              </Text>
            )}
          </View>
          <TouchableRipple
            borderless
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: 2,
              backgroundColor: color(colors.secondary).alpha(0.7).hexa(),
            }}
            onPress={() => {}}>
            <IcRoundShare width={14} height={14} color={colors.onSecondary} />
          </TouchableRipple>
        </View>
      </View>
    </TouchableRipple>
  );
}

export default TopicCard;
