import { request } from '@/utils';

export async function getMenusByUserId(uid: string, token?: string, lang?: string = 'zh-CN') {
  return request(`/api/menu/${uid}`, { method: 'GET', params: { token, lang } });
}
