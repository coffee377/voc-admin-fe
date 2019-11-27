import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { EChartsProps } from '@/components/Echarts/echats';

export interface GaugeProps extends Partial<EChartsProps> {
  // option?: any;
}

const option5 = {
  series: [
    {
      name: '总人次',
      type: 'gauge',
      center: ['50%', '45%'],
      z: 3,
      min: 0,
      max: 100,
      radius: '75%',
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          width: 5,
        },
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'auto',
        },
      },
      splitLine: {
        length: 18,
        lineStyle: {
          color: 'auto',
        },
      },
      pointer: {
        width: 8,
      },
      title: {
        textStyle: {
          fontWeight: 'bolder',
          fontSize: 16,
          fontStyle: 'normal',
          color: '#dedede',
        },
        offsetCenter: [0, '-25%'],
      },
      detail: {
        textStyle: {
          fontSize: 18,
          fontWeight: 'bolder',
          // color:'#fff324'
        },
        formatter: '{value} %',
        offsetCenter: [0, '80%'],
      },

      data: [32],
    },
    {
      name: '门诊总人次占比',
      type: 'gauge',
      center: ['20%', '65%'],
      radius: '55%',
      min: 0,
      max: 100,
      endAngle: 30,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          width: 3,
        },
      },
      axisTick: {
        length: 6,
        lineStyle: {
          color: 'auto',
        },
      },
      splitLine: {
        length: 12,
        lineStyle: {
          color: 'auto',
        },
      },
      pointer: {
        width: 4,
      },
      title: {
        textStyle: {
          fontWeight: 'bolder',
          fontSize: 16,
          fontStyle: 'normal',
          color: '#dedede',
        },
        offsetCenter: ['40%', '30%'],
      },
      detail: {
        textStyle: {
          fontSize: 18,
          fontWeight: 'bolder',
          // color:'#fff324'
        },
        formatter: ' {value} %',
        offsetCenter: ['0%', '100%'],
      },
      data: [37],
    },
    {
      name: '住院总人次占比',
      type: 'gauge',
      center: ['80%', '65%'],
      radius: '55%',
      min: 0,
      max: 100,
      startAngle: 150,
      endAngle: -45,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          color: [
            [0.2, '#ff4500'],
            [0.8, '#48b'],
            [1, '#228b22'],
          ],
          width: 3,
        },
      },
      axisTick: {
        splitNumber: 5,
        length: 6,
        lineStyle: {
          color: 'auto',
        },
      },
      splitLine: {
        length: 12,
        lineStyle: {
          color: 'auto',
        },
      },
      pointer: {
        width: 5,
      },
      title: {
        textStyle: {
          fontWeight: 'bolder',
          fontSize: 16,
          fontStyle: 'normal',
          color: '#dedede',
        },
        offsetCenter: ['-40%', '30%'],
      },
      detail: {
        textStyle: {
          fontSize: 18,
          fontWeight: 'bolder',
        },
        formatter: ' {value} %',
        offsetCenter: ['-40%', '100%'],
      },
      data: [27],
    },
  ],
};

const Gauge: React.FC<GaugeProps> = props => <ReactEcharts option={option5} style={props.style} />;
Gauge.defaultProps = {};

export default Gauge;
