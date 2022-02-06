import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IonCodeSlashOutline: React.FC<Props> = props => {
  const {size, color} = props;

  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M160 368L32 256l128-112"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M352 368l128-112l-128-112"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M304 96l-96 320"
      />
    </Svg>
  );
};
IonCodeSlashOutline.defaultProps = {
  size: 24,
  color: '#000',
};

export default IonCodeSlashOutline;
