import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { CommonProps } from '@/components/Echarts/index';
import { mixin } from '@/utils/merge';
import { NameValue } from '@/components/Echarts/Pie';

export interface LineData {
  category?: string[];
  series?: NameValue[];
}

export interface LineProps extends CommonProps {
  /**
   * 数据集
   */
  dataset?: LineData;
  /**
   * 是否堆叠
   */
  stack?: boolean | string;
  /**
   * 是否平滑曲线
   */
  smooth?: boolean;
}

const Line: React.FC<LineProps> = props => {
  const { loading, theme, style, className } = props;

  const getOption = () => {
    const { title, showLegend, dataset, stack, smooth, option } = props;

    const series = [];

    dataset?.series?.forEach((item, index, array) => {
      let s: object = {
        name: item.name,
        type: 'line',
        smooth,
        label: {
          position: 'top',
        },
        lineStyle: {
          width: 1,
          type: 'dotted',
        },
        areaStyle: {},
        z: array.length - index,
        data: item.value,
      };

      if (stack) {
        s = mixin(s, { stack });
      }

      series.push(s);
    });

    const innerOption = {
      title: {
        show: title,
        text: title,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        show: showLegend,
        type: 'scroll',
        x: 'center',
        y: 'bottom',
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: dataset?.category,
        },
      ],
      yAxis: [{ type: 'value' }],
      series,
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

Line.defaultProps = {
  dataset: {
    category: [],
    series: [],
  },
  showLegend: true,
  stack: false,
  smooth: true,
};

export default Line;
