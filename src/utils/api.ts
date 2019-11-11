export interface ApiStructure {
  success?: boolean;
  code?: string | number;
  message?: string;
  data: any;
}

// export const SUCCESS: String = 'OK' || 'YES' || 'SUCCESS';

const SUCCESS = (message:string) => message.toUpperCase() === 'OK' || message.toUpperCase() === 'YES' || message.toUpperCase() === 'SUCCESS'

export type ApiResponse = ApiStructure | any;
export type HasProperty<T extends ApiResponse> = (response: T, name: string) => boolean;
export type HasException<T extends ApiResponse> = (response: T) => boolean;
export type Structured = (response: ApiResponse) => boolean;

export const hasApiProperty: HasProperty<ApiStructure> = (
  apiStructure: ApiStructure,
  name: string,
) => apiStructure && apiStructure[name] !== undefined;

export const isApiStructured: Structured = (response: ApiResponse) =>
  hasApiProperty(response, 'message');

export const hasApiException: HasException = (response: ApiResponse) => {
  const { message } = response;
  /* API 返回异常提示处理 */
  return isApiStructured(response) && !SUCCESS(message);
};
