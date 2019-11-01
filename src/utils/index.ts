import request from './request';
import { ECharsColor, G2Color } from './color';

const delay = (time: any) => new Promise(resolve => setTimeout(resolve, time));

export { delay, request, ECharsColor, G2Color }
