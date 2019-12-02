import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { StyleProps, WithFalse } from '@/typings';
import { mixin } from '@/utils/merge';

/**
 * 雷达图指示器
 */
export interface RadarIndicate {
  name: string;
  max?: number;
  min?: number;
  color?: string;
}

/**
 * 雷达图数据
 */
export interface RadarData {
  name: string;
  value: number;
}

export interface RadarProps extends StyleProps {
  /**
   * 雷达图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
   * @see https://www.echartsjs.com/zh/option.html#radar.center
   */
  center?: Array<string | number>;
  /**
   * 雷达图半径
   * @see https://www.echartsjs.com/zh/option.html#radar.radius
   */
  radius?: number | string | Array<number | string>;
  /**
   * 指示器轴的分割段数
   * @see https://www.echartsjs.com/zh/option.html#radar.splitNumber
   */
  splitNumber?: number;
  /**
   * 雷达图绘制类型
   * @see https://www.echartsjs.com/zh/option.html#radar.shape
   */
  shape?: 'polygon' | 'circle' | string;
  /**
   * 雷达图的指示器，用来指定雷达图中的多个变量（维度）
   * @see https://www.echartsjs.com/zh/option.html#radar.shape
   */
  indicator?: RadarIndicate[];
  /**
   * 数据集
   */
  dataset?: { name: string; value: number[] }[];
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

const Radar: React.FC<RadarProps> = props => {
  const { loading, theme, style, className } = props;
  const getOption = () => {
    const {
      title,
      splitNumber,
      shape,
      indicator,
      center,
      radius,
      showLegend,
      dataset,
      option,
    } = props;
    const innerOption = {
      title: {
        show: title,
        text: title,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: showLegend,
        type: 'scroll',
        x: 'center',
        y: 'bottom',
      },
      radar: [
        {
          splitNumber,
          shape,
          indicator,
          center,
          radius,
        },
      ],
      series: [
        {
          type: 'radar',
          radarIndex: 0,
          label: { show: false },
          areaStyle: { type: 'default', opacity: 0.7 },
          symbol: 'none',
          data: dataset,
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

Radar.defaultProps = {
  center: ['50%', '50%'],
  radius: 85,
  splitNumber: 3,
  shape: 'polygon',
  showLegend: true,
};

export default Radar;
