import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { StyleProps } from '@/typings';
import { mixin } from '@/utils/merge';

export interface NameValue {
  name: string;
  value: number;
}

export interface BarProps extends StyleProps {
  /**
   * 数据集
   */
  dataset?: NameValue[];
  /**
   * 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
   * @see https://www.echartsjs.com/zh/option.html#series-pie.center
   */
  center?: Array<string | number>;
  /**
   * 饼图的半径
   * @see https://www.echartsjs.com/zh/option.html#series-pie.radius
   */
  radius?: number | string | Array<number | string>;
  /**
   * 显示加载动画
   */
  loading?: boolean;
  /**
   * echarts 配置
   */
  option?: object;
  /**
   * 是否展示成南丁格尔图，通过半径区分数据大小
   */
  roseType?: boolean | 'radius' | 'area';
}

const Pie: React.FC<BarProps> = props => {
  const { dataset, center, radius, loading, roseType, option, style, className } = props;
  const getOption = () => {
    const innerOption = {
      dataset: {
        source: dataset,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/> {b} {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        // orient: 'vertical',
        // x: 'left',
        y: 'bottom',
      },

      series: [
        {
          name: '访问来源',
          type: 'pie',
          roseType,
          label: {
            show: true,
            // position: 'center',
          },
          labelLine: {
            show: true,
          },
          emphasis: {
            label: {
              show: true,
              textStyle: {
                // fontSize: '30',
                // fontWeight: 'bold',
              },
            },
          },
          center: center || ['50%', '50%'],
          radius: radius || [0, '75%'],
        },
      ],
    };

    return mixin(innerOption, option);
  };

  return (
    <ReactEcharts option={getOption()} showLoading={loading} style={style} className={className} />
  );
};

Pie.defaultProps = {
  dataset: [],
  loading: false,
  roseType: false,
};

export default Pie;
