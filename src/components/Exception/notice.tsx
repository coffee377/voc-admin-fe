import { notification, Tag, Typography } from 'antd';
import React, { Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Exception, ExceptionDescriptionProps, ExceptionTitleProps } from '@/utils/error';

export const notice = (exception: Exception, duration?: number) => {
  const { key } = exception;
  notification.error({
    key,
    message: <ExceptionTitle {...exception} />,
    description: <ExceptionDescription {...exception} />,
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

const ExceptionTitle: React.FC<ExceptionTitleProps> = ({ status, title, code }) => (
  <Fragment>
    <Text ellipsis type="secondary">
      <Tag color="red" visible={status}>
        {status}
      </Tag>
      <Tag visible={code && String(status) !== String(code)}>{code}</Tag>
      {title ||
        formatMessage({
          id: 'component.exception.api.error',
          defaultMessage: 'API Request Exception',
        })}
    </Text>
  </Fragment>
);

/**
 * URL 属性
 */
export interface URLContentProps {
  url: string;
  method: string;
  color: string;
}

/**
 * URL 描述
 * @param url 请求地址
 * @param method 请求方法
 * @param color 标签颜色
 * @constructor
 */
const URLContent: React.FC<URLContentProps> = ({ url, method, color }) => (
  <Fragment>
    <Tag color={color} visible={method}>
      {method}
    </Tag>
    <span>{url}</span>
  </Fragment>
);

/**
 * 异常描述
 * @param props ExceptionDescriptionProps
 * @constructor
 */
const ExceptionDescription: React.FC<ExceptionDescriptionProps> = props => {
  const { url, method, code, message } = props;
  const METHOD = (method || '').toUpperCase();
  const Desc = () => {
    if (METHOD) {
      return (
        <Fragment>
          <URLContent method={METHOD} url={url} color={HttpMethodColor[METHOD]} />
          <Text
            copyable={{
              text: JSON.stringify({ url, method, code, message }),
            }}
            ellipsis
            type="secondary"
          />
        </Fragment>
      );
    }
    return null;
  };
  return (
    <Fragment>
      <Desc />
      <div style={{ marginTop: 10 }}>{message || ''}</div>
    </Fragment>
  );
};
