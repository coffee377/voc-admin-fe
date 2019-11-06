import { notification, Tag, Typography } from 'antd';
import React, { Fragment, PureComponent } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Exception, ExceptionDescriptionProps, ExceptionTitleProps } from '@/utils';


export const notice = (exception: Exception, duration?: number) => {
  notification.error({
    message: <ExceptionTitle {...exception}/>,
    description: <ExceptionDescription {...exception}/>,
    duration: duration || null,
  });
};

const HttpMethodColor = {
  GET: 'green',
  POST: 'blue',
  PUT: 'gold',
  DELETE: 'red',
  HEAD: 'magenta',
  OPTIONS: 'purple',
  TRACE: 'lime',
  CONNECT: 'volcano',
};

const { Text } = Typography;

class ExceptionTitle extends PureComponent<ExceptionTitleProps> {
  static defaultProps = {
    // title: '默认标题',
  };

  render() {
    const { title, status, errorCode } = this.props;
    return (
      <Fragment>
        <Text ellipsis type="secondary">
          <Tag color="red" visible={status}>{status}</Tag>
          <Tag visible={errorCode}>{errorCode}</Tag>
          {title || formatMessage({ id: 'component.exception.api.error', defaultMessage: 'API Request Exception' })}
        </Text>
      </Fragment>
    );
  }
}

class ExceptionDescription extends PureComponent<ExceptionDescriptionProps> {
  static defaultProps = {
    // title: '默认标题',
  };

  render() {
    const { url, method, errorCode, errorMessage } = this.props;
    const METHOD = (method || '').toUpperCase();

    const text = () => {
      if (METHOD) {
        const color = HttpMethodColor[METHOD];
        return (
          <Text copyable={{
            text: JSON.stringify({
              url, method, code: errorCode, message: errorMessage,
            }),
          }} ellipsis type="secondary">
            <Tag color={color} visible={METHOD}>{METHOD}</Tag>
            <span>{url}</span>
          </Text>
        );
      }
      return '';
    };
    return (
      <Fragment>
        {text()}
        <div style={{ marginTop: 10 }}>{errorMessage || ''}</div>
      </Fragment>
    );
  }
}
