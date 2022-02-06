import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IonOpenOutline: React.FC<Props> = props => {
  const {size, color} = props;

  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 512 512" {...props}>
      <Path
        d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M336 64h112v112"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M224 288L440 72"
      />
    </Svg>
  );
};

IonOpenOutline.defaultProps = {
  size: 24,
  color: '#000',
};

export default IonOpenOutline;
