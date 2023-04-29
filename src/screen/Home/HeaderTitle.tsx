import React from 'react';
import {SvgCss} from 'react-native-svg';
import {useAppearance} from '@/utils/appearance';
import Readhub from '@/assets/homeTitle/Readhub.svg';

function HeaderTitle() {
  const {paperTheme} = useAppearance();

  return <SvgCss xml={Readhub.toString()} color={paperTheme.colors.primary} />;
}

export default HeaderTitle;
