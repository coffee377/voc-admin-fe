import React from 'react';
import { connect } from 'dva';
import { Icon, message, Popconfirm, Tooltip } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { formatMessage } from 'umi-plugin-react/locale';
import { DispatchProps } from '@/typings';

export interface LogoutProps extends PopconfirmProps, DispatchProps {
  /**
   * 样式
   */
  className?: string;
}

@connect()
class Logout extends React.PureComponent<LogoutProps> {
  static defaultProps: LogoutProps = {
    title: formatMessage({ id: 'app.logout.title', defaultMessage: 'Are you sure to exit' }),
    placement: 'topLeft',
    okText: formatMessage({ id: 'app.logout.confirm', defaultMessage: 'Yes' }),
    cancelText: formatMessage({ id: 'app.logout.cancel', defaultMessage: 'No' }),
    icon: <Icon type="question-circle-o" style={{ color: 'red' }} />,
  };

  render() {
    const { className } = this.props;
    return (
      <Tooltip title={formatMessage({ id: 'app.logout', defaultMessage: 'Logout' })}>
        <Popconfirm {...this.props}>
          <span className={className}>
            <Icon type="poweroff" />
          </span>
        </Popconfirm>
      </Tooltip>
    );
  }
}

export default Logout;
