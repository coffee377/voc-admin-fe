export { default as request } from './request';
export { ECharsColor, G2Color } from './color';
export { hasApiProperty, isApiStructured, hasApiException } from './api';

const delay = (time: any) => new Promise(resolve => setTimeout(resolve, time));
export { delay };
