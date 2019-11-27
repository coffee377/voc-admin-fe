import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { EChartsProps } from '@/components/Echarts/echats';

export interface BarProps extends Partial<EChartsProps> {
  // option?: any;
}

const option6 = {
  title: {
    text: '雷达图',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    x: 'center',
    y: 'bottom',
    type: 'scroll',
    data: ['降水量', '蒸发量'],
  },
  radar: [
    {
      indicator: (function() {
        const res = [];
        for (let i = 1; i <= 12; i++) {
          res.push({ text: `${i}月`, max: 100 });
        }
        return res;
      }()),
      center: ['50%', '48%'],
      radius: 95,
    },
  ],
  series: [
    {
      type: 'radar',
      // radarIndex: 2,
      itemStyle: { normal: { areaStyle: { type: 'default' } } },
      data: [
        {
          name: '降水量',
          value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: '蒸发量',
          value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3],
        },
      ],
    },
  ],
};

const Radar: React.FC<BarProps> = props => <ReactEcharts option={option6} {...props} />;

Radar.defaultProps = {};

export default Radar;
