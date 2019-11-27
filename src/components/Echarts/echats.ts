import echarts from 'echarts';
import { ReactEchartsPropsTypes } from 'echarts-for-react';

export interface EChartsProps extends Partial<ReactEchartsPropsTypes> {
  // events?: EchartsEvent;
  // option?: any;
  callback?: (instance: echarts.ECharts) => void;
}

export interface ReactEchartsAPI {
  getEchartsInstance: () => echarts.ECharts;
}
