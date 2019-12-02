import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { StyleProps, WithFalse } from '@/typings';
import { mixin } from '@/utils/merge';
import { NameValue } from '@/components/Echarts/Pie';

export interface GaugeProps extends StyleProps {
  /**
   * 标题
   */
  title?: WithFalse<string>;
  /**
   * 是否显示图例
   */
  showLegend?: boolean;
  /**
   * 显示加载动画
   */
  loading?: boolean;
  /**
   * echarts 配置
   */
  option?: object;
  /**
   * 主题
   */
  theme?: object | string;
  /**
   * 数据集
   */
  dataset?: NameValue[];
}

const Gauge: React.FC<GaugeProps> = props => {
  const { loading, theme, style, className } = props;
  const getOption = () => {
    const { option, dataset } = props;
    /* 仪表盘标题 */
    const title = {
      fontWeight: 'bolder',
      fontSize: 16,
      fontStyle: 'normal',
      color: '#7b7b7b',
    };

    /* 仪表盘详情，用于显示数据 */
    const detail = {
      fontSize: 18,
      fontWeight: 'bolder',
    };

    const innerOption = {
      title: {
        show: props.title,
        text: props.title,
      },
      tooltip: {
        formatter: '{b}: {c}%',
      },
      series: [
        {
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
            ...title,
            offsetCenter: [0, '125%'],
          },
          detail: {
            ...detail,
            formatter: '{value} %',
            offsetCenter: [0, '80%'],
          },
          data: [dataset[0]],
        },
        {
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
            ...title,
            offsetCenter: ['-10%', '-125%'],
          },
          detail: {
            ...detail,
            formatter: ' {value} %',
            offsetCenter: ['0%', '100%'],
          },
          data: [dataset[1]],
        },
        {
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
            ...title,
            offsetCenter: ['10%', '-125%'],
          },
          detail: {
            ...detail,
            formatter: ' {value} %',
            offsetCenter: ['0%', '100%'],
          },
          data: [dataset[2]],
        },
      ],
    };
    return mixin(innerOption, option);
  };

  return (
    <ReactEcharts
      option={getOption()}
      showLoading={loading}
      theme={theme}
      style={style}
      className={className}
    />
  );
};

Gauge.defaultProps = {
  showLegend: true,
};

export default Gauge;
