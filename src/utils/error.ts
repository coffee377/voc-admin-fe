import { Omit } from 'antd/es/_util/type';
import hash from 'object-hash';
import { ResponseError } from 'umi-request';

export interface ExceptionTitleProps {
  title?: string;
  status?: number;
  code?: string | number;
}

export interface ExceptionDescriptionProps {
  title?: string;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT' | string;
  status?: number;
  code?: string | number;
  message: string;
}

export interface Exception
  extends Omit<ExceptionTitleProps, ['title', 'status', 'code']>,
    ExceptionDescriptionProps {
  key?: string;
}

export interface IBizError<E extends Exception> extends Error {
  name: string;
  message: string;
  exception: E;
}

/**
 * 响应异常
 */
export class BizError<E extends Exception> implements IBizError {
  exception: E;

  message: string;

  name: string;

  constructor(exception: E) {
    this.exception = exception;
    this.message = exception.message;
    this.name = 'BizError';
  }
}

export const getException = (e: any) => {
  if (e instanceof BizError) {
    return null;
  }
  return {}
};

export const errorKey = (e: Exception) => {
  const { url, status, method } = e;
  return hash({ url, status, method });
};
