import { request } from '@/utils';

export async function getMenusByUserId(uid: string, token?: string) {
  return request(`/menu/${uid}`, { method: 'GET', params: { token } });
}
