/* API JSON 响应数据结构 */
export interface ApiStructure {
  success?: boolean;
  code?: string | number;
  message?: string;
  data: any;
}

export interface Exception extends ExceptionTitleProps, ExceptionDescriptionProps{
}

export interface ExceptionDescriptionProps {
  title?: string
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT' | string
  status?: number
  errorCode?: string | number
  errorMessage: string
}

export interface ExceptionTitleProps {
  title?: string
  status?: number
  errorCode?: string | number
}

export type ApiResponse = ApiStructure | any;
export type HasProperty<T extends ApiResponse> = (response: T, name: string) => boolean;
export type HasException<T extends ApiResponse> = (response: T) => boolean;
export type Structured = (response: ApiResponse) => boolean;

export const hasApiProperty: HasProperty<ApiStructure> = (
  apiStructure: ApiStructure,
  name: string,
) => apiStructure && apiStructure[name] !== undefined;

export const isApiStructured: Structured = (response: ApiResponse) => hasApiProperty(response, 'data');

export const hasApiException: HasException = (response: ApiResponse) => {
  const { code } = response;
  /* API 返回异常提示处理 */
  return isApiStructured(response) && code && code !== `${0}`;
};
