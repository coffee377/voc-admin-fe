import React from 'react';
import { StyleProps } from '@/typings';
import './layout.less';
import GridLayout, { Item } from '@/layouts/GridLayout';
import Geo from '@/components/Echarts/Geo';
import Bar from '@/components/Echarts/Bar';
import Line from '@/components/Echarts/Line';
import Pie from '@/components/Echarts/Pie';
import Radar from '@/components/Echarts/Radar';
import Gauge from '@/components/Echarts/Gauge';

export interface DemonLayoutProps extends Partial<StyleProps> {
  header?: React.ReactNode;
  item1?: React.ReactNode;
  item2?: React.ReactNode;
  item3?: React.ReactNode;
  item4?: React.ReactNode;
  item5?: React.ReactNode;
  item6?: React.ReactNode;
  footer?: React.ReactNode;
}

const DemonLayout: React.FC<DemonLayoutProps> = props => {
  const items: Item[] = [];
  items.push({ content: props.item1, className: 'ui-grid-item1' } as Item);
  items.push({ content: props.item2, className: 'ui-grid-item2' } as Item);
  items.push({ content: props.item3, className: 'ui-grid-item3' } as Item);
  items.push({ content: props.item4, className: 'ui-grid-item4' } as Item);
  items.push({ content: props.item5, className: 'ui-grid-item5' } as Item);
  items.push({ content: props.item6, className: 'ui-grid-item6' } as Item);
  return <GridLayout header={props.header} items={items} footer={props.footer} />;
};

/* 默认属性 */
DemonLayout.defaultProps = {
  // header: 'this is title',
  // footer: 'this is footer',
  item1: <Bar />,
  item2: <Line />,
  item3: (
    <Geo
      style={{ height: '385px' }}
      option={{ geo: { zoom: 1.2, scaleLimit: { min: 1.2, max: 3 } } }}
      aspectScale={1}
    />
  ),
  item4: <Gauge style={{ height: '215px' }} />,
  item5: <Pie />,
  item6: <Radar />,
};
export default DemonLayout;
