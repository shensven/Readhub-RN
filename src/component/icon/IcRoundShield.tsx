import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {size?: number; color?: string};

function IcRoundShield(props: Props) {
  const {size = 24, color = '#000'} = props;
  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 24 24" {...props}>
      <Path
        fill={color}
        d="M11.3 2.26l-6 2.25C4.52 4.81 4 5.55 4 6.39v4.7c0 4.83 3.13 9.37 7.43 10.75c.37.12.77.12 1.14 0c4.3-1.38 7.43-5.91 7.43-10.75v-4.7a2 2 0 0 0-1.3-1.87l-6-2.25c-.45-.18-.95-.18-1.4-.01z"
      />
    </Svg>
  );
}

export default IcRoundShield;
