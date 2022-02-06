import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const MdiDotsVertical: React.FC<Props> = props => {
  const {size, color} = props;

  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 24 24" {...props}>
      <Path
        d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2z"
        fill="currentColor"
      />
    </Svg>
  );
};

MdiDotsVertical.defaultProps = {
  size: 24,
  color: '#000',
};

export default MdiDotsVertical;
