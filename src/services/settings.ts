import { request } from '@/utils';
import { DefaultSettings } from '../../config/defaultSettings';

export async function getSettings() {
  return request('/settings', { method: 'GET' });
}

export async function updateSettings(data: DefaultSettings) {
  return request('/settings', { method: 'PUT', data });
}
