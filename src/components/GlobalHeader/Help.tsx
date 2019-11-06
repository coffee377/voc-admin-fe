import React from 'react';
import { Icon, Tooltip } from 'antd';
import Link from '@/components/Link';

export interface HelpProps {
  href?: string;
  className?: string;
}

class Help extends React.PureComponent<HelpProps> {
  static defaultProps: HelpProps = {
    href: 'https://pro.ant.design/docs/getting-started-cn',
  };

  render() {
    return (
      <Tooltip title="帮助">
        <Link title={<Icon type="question-circle-o" />} {...this.props} />
      </Tooltip>
    );
  }
}

export default Help;
