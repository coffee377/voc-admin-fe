import React from 'react';
import { StyleProps } from '@/typings';
import './layout.less';
import GridLayout, { Item } from '@/layouts/GridLayout';

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
  items.push({ content: props.item1, className: 'ui-grid-item1' });
  items.push({ content: props.item2, className: 'ui-grid-item2' });
  items.push({ content: props.item3, className: 'ui-grid-item3' });
  items.push({ content: props.item4, className: 'ui-grid-item4' });
  items.push({ content: props.item5, className: 'ui-grid-item5' });
  items.push({ content: props.item6, className: 'ui-grid-item6' });
  return <GridLayout {...props} items={items} />;
};

/* 默认属性 */
DemonLayout.defaultProps = {
  header: 'this is title',
  footer: 'this is footer',
  item1: 'item1',
  item2: 'item2',
  item3: 'item3',
  item4: 'item4',
  item5: 'item5',
  item6: 'item6',
};

export default DemonLayout;
