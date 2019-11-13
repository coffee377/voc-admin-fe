import React from 'react';
import { StyleProps } from '@/typings';

export interface LinkProps extends Partial<StyleProps> {
  id?: string | number;
  title: React.ReactNode;
  href?: string;
  blankTarget?: boolean;
}

const Link: React.FC<LinkProps> = props => {
  const { id, title, href, blankTarget, style, className } = props;
  return (
    <a
      key={id}
      target={blankTarget ? '_blank' : '_self'}
      href={href}
      style={style}
      className={className}
    >
      {title}
    </a>
  );
};

Link.defaultProps = {
  blankTarget: true,
};

export default Link;
