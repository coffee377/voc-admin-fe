import React, { CSSProperties } from 'react';
import '../global.less';
import classNames from 'classnames';
import { StyleProps } from '@/typings';

export interface Item extends Partial<StyleProps> {
  key: string | number;
  content?: React.ReactNode;
}

export interface GridLayoutProps extends Partial<StyleProps> {
  gridContainerStyle?: CSSProperties;
  gridItemStyle?: CSSProperties;
  header?: React.ReactNode;
  items?: Item[];
  footer?: React.ReactNode;
}

const prefixClassName = 'ui-grid';

const GridLayout: React.FC<GridLayoutProps> = props => {
  const { className, style, gridContainerStyle, gridItemStyle, items, children } = props;
  return (
    <div className={classNames(`${prefixClassName}-wrap`, className)} style={style}>
      {props.header && (
        <div className={classNames(`${prefixClassName}-header`)}>{props.header}</div>
      )}
      <div className={classNames(`${prefixClassName}-container`)} style={gridContainerStyle}>
        {items &&
          items.map(item => (
            <div
              key={item.key}
              className={classNames(`${prefixClassName}-item`, item.className)}
              style={{ ...gridItemStyle, ...item.style }}
            >
              {item.content}
            </div>
          ))}
        {children}
      </div>
      {props.footer && (
        <div className={classNames(`${prefixClassName}-footer`)}>{props.footer}</div>
      )}
    </div>
  );
};

export default GridLayout;
