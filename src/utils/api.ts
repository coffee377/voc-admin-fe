/* API JSON 响应数据结构 */
export interface ApiStructure {
  success?: boolean;
  code?: string | number;
  message?: string;
  data: any;
}

export type ApiResponse = ApiStructure | any;
export type HasProperty<T extends ApiResponse> = (response: T, name: string) => boolean;
export type Structured = (response: any) => boolean;

export const hasApiProperty: HasProperty<ApiStructure> = (
  apiStructure: ApiStructure,
  name: string,
) => apiStructure && apiStructure[name] !== undefined;

export const isApiStructured: Structured = (response: any) => hasApiProperty(response, 'data');
