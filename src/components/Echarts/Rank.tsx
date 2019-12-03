import React from 'react';
import { StyleProps } from '@/typings';

export interface RankProps extends StyleProps {
  dataset?: object[];
}

const Rank: React.FC<RankProps> = props => {
  const { dataset } = props;
  return <div></div>;
};

Rank.defaultProps = {
  dataset: [],
};

export default Rank;
