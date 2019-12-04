import ReactEcharts from 'echarts-for-react';
import React from 'react';
import { mixin } from '@/utils/merge';
import { CommonProps } from '@/components/Echarts/index';

export interface BarProps extends CommonProps {
  /**
   * 数据集
   */
  dataset?: any[][] | Record<string, any>;
}

const Bar: React.FC<BarProps> = props => {
  const { loading, theme, style, className } = props;

  const getOption = () => {
    const { title, showLegend, dataset, option } = props;
    const series = [];
    if (Array.isArray(dataset) && Array.isArray(dataset[0])) {
      const d = dataset[0] as Array<any>;
      for (let i = 1; i < d.length; i++) {
        series.push({ type: 'bar', seriesLayoutBy: 'column' });
      }
    }

    const innerOption = {
      title: {
        show: title,
        text: title,
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          snap: true,
        },
      },
      legend: {
        show: showLegend,
        type: 'scroll',
        x: 'center',
        y: 'bottom',
      },

      xAxis: [{ type: 'category', gridIndex: 0 }],
      yAxis: [{ type: 'value', gridIndex: 0 }],
      dataset: {
        source: dataset,
      },
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

Bar.defaultProps = {
  dataset: [],
  showLegend: true,
};

export default Bar;
