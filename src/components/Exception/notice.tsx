import { notification, Table } from 'antd';
import * as React from 'react';
import { ApiResponse, isApiStructured } from '@/utils';

export const notice = (api: ApiResponse, duration?: number) =>
  notification.error({
    message: 'API 请求错误',
    description: <Table />,
    duration: duration || null,
  });
