import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IonChevronForwardOutline: React.FC<Props> = props => {
  const {size, color} = props;

  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M184 112l144 144l-144 144"
      />
    </Svg>
  );
};
IonChevronForwardOutline.defaultProps = {
  size: 24,
  color: '#000',
};

export default IonChevronForwardOutline;
