import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { StyleProps, WithFalse } from '@/typings';
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
   * 是否展示成南丁格尔图，通过半径区分数据大小
   */
  roseType?: boolean | 'radius' | 'area';
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
}

const Pie: React.FC<BarProps> = props => {
  const { loading, theme, style, className } = props;
  const getOption = () => {
    const { title, dataset, showLegend, center, radius, roseType, option } = props;

    const innerOption = {
      title: {
        show: title,
        text: title,
      },
      dataset: {
        source: dataset,
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${params.name}: ${params.data.value} (${params.percent}%)`,
      },
      legend: {
        show: showLegend,
        type: 'scroll',
        x: 'center',
        y: 'bottom',
      },

      series: [
        {
          type: 'pie',
          roseType,
          label: {
            show: true,
          },
          labelLine: {
            show: true,
          },
          emphasis: {
            label: {
              show: true,
              textStyle: {},
            },
          },
          center,
          radius,
        },
      ],
    };

    return mixin(innerOption, option);
  };

  return (
    <ReactEcharts
      option={getOption()}
      showLoading={loading}
      style={style}
      className={className}
      theme={theme}
    />
  );
};

Pie.defaultProps = {
  center: ['50%', '50%'],
  radius: [0, '75%'],
  showLegend: true,
  dataset: [],
  loading: false,
  roseType: false,
};

export default Pie;
