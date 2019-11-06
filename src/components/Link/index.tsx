import React from 'react';

export interface LinkProps {
  key?: string;
  title: React.ReactNode;
  href?: string;
  blankTarget?: boolean;
  className?: string;
}

class Link extends React.PureComponent<LinkProps> {
  static defaultProps = {
    blankTarget: true,
  };

  render() {
    const { title, href, blankTarget, className } = this.props;
    return (
      <a target={blankTarget ? '_blank' : '_self'} href={href} className={className}>
        {title}
      </a>
    );
  }
}

export default Link;
