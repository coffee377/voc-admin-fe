import { request } from '@/utils';
import { SettingState } from '@/models/settings';

export async function getSettings() {
  return request('/settings', { method: 'GET' });
}

export async function updateSettings(data: SettingState, uid?:string) {
  return request('/settings', { method: 'PUT', data });
}
