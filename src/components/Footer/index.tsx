import React, { Fragment } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import { StyleProps, WithFalse } from '@/typings';
import Link, { LinkProps } from '@/components/Link';
import './style.less';

export interface Render {
  copyrightRender: WithFalse<() => CopyrightProps>;
}

export interface FooterProps extends Partial<StyleProps>, Partial<Render> {
  links?: WithFalse<LinkProps[]>;
  copyright?: WithFalse<CopyrightProps>;
}

export interface CopyrightProps extends Partial<StyleProps>, Partial<Render> {
  prefix?: WithFalse<React.ReactNode>;
  year?: number;
  copyright?: React.ReactNode;
  defaultCopyright?: React.ReactNode;
}

const Copyright: React.FC<CopyrightProps> = ({
  prefix,
  year,
  copyright,
  defaultCopyright,
  copyrightRender,
}: CopyrightProps) => {
  if (copyrightRender) {
    return copyrightRender();
  }
  return (
    <>
      {prefix && (
        <>
          <span>{prefix} </span>
          <span>{year} </span>
        </>
      )}
      <span>{copyright || defaultCopyright}</span>
    </>
  );
};

export const defaultCopyrightPrefix = () => (
  <Fragment>
    Copyright <Icon type="copyright" />
  </Fragment>
);

Copyright.defaultProps = {
  prefix: (
    <>
      Copyright <Icon type="copyright" />
    </>
  ),
  year: new Date().getFullYear(),
  defaultCopyright: '咖啡之音工作室出品',
};

const Footer: React.FC<FooterProps> = props => {
  const { links, copyright, copyrightRender, style, className } = props;
  return (
    <footer
      className={classNames('ant-pro-global-footer', className)}
      style={{ padding: 0, ...style }}
    >
      {links && (
        <div className="ant-pro-global-footer-links">
          {Array.isArray(links) &&
            links.map((linkProps, index) => <Link key={index} {...linkProps} />)}
        </div>
      )}
      {copyright && (
        <div className="ant-pro-global-footer-copyright">
          <Copyright {...copyright} copyrightRender={copyrightRender} />
        </div>
      )}
    </footer>
  );
};

Footer.defaultProps = {
  copyrightRender: false,
} as FooterProps;

export default Footer;
