import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IonShapesOutline: React.FC<Props> = props => {
  const {size, color} = props;

  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 512 512" {...props}>
      <Path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" d="M336 320H32L184 48l152 272z" />
      <Path
        d="M265.32 194.51A144 144 0 1 1 192 320"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </Svg>
  );
};
IonShapesOutline.defaultProps = {
  size: 24,
  color: '#000',
};

export default IonShapesOutline;
