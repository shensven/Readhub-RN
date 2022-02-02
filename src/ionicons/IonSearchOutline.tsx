import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IonSearchOutline: React.FC<Props> = props => {
  const {size, color} = props;

  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 512 512" {...props}>
      <Path
        d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
        d="M338.29 338.29L448 448"
      />
    </Svg>
  );
};

IonSearchOutline.defaultProps = {
  size: 24,
  color: '#000',
};

export default IonSearchOutline;
