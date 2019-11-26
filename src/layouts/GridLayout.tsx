import React from 'react';
import '../global.less';
import classNames from 'classnames';
import { StyleProps } from '@/typings';

export interface Item extends Partial<StyleProps> {
  content?: React.ReactNode;
}

export interface GridLayoutProps extends Partial<StyleProps> {
  header?: React.ReactNode;
  items?: Item[];
  footer?: React.ReactNode;
}

const prefixClassName = 'ui-grid';

const GridLayout: React.FC<GridLayoutProps> = props => {
  const { className, style, items } = props;
  return (
    <div className={classNames(`${prefixClassName}-wrap`, className)} style={style}>
      {props.header && (
        <div className={classNames(`${prefixClassName}-header`)}>{props.header}</div>
      )}
      <div className={classNames(`${prefixClassName}-container`)}>
        {items &&
          items.map((item, index, array) => (
              <div
                key={index}
                className={classNames(`${prefixClassName}-item`, item.className)}
                style={item.style}
              >
                {item.content}
              </div>
            ))}
      </div>
      {props.footer && (
        <div className={classNames(`${prefixClassName}-footer`)}>{props.footer}</div>
      )}
    </div>
  );
};

export default GridLayout;
