import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { StyleProps, WithFalse } from '@/typings';
import { mixin } from '@/utils/merge';
import { NameValue } from '@/components/Echarts/Pie';
import 'echarts-wordcloud';

export interface WordCloudProps extends StyleProps {
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

  shape?: string;
  maskImage?: string;
  width?: string;
  height?: string;
  gridSize?: number;
  sizeRange?: [number, number];
  rotationRange?: [number, number];
  rotationStep?: number;
}

const WordCloud: React.FC<WordCloudProps> = props => {
  const { loading, theme, style, className } = props;
  const getOption = () => {
    const {
      option,
      dataset,
      shape,
      maskImage,
      width,
      height,
      gridSize,
      sizeRange,
      rotationRange,
      rotationStep,
    } = props;

    const mask = new Image();
    if (maskImage != null) {
      mask.src = maskImage;
    }
    const innerOption = {
      title: {
        show: props.title,
        text: props.title,
      },
      series: [
        {
          type: 'wordCloud',

          // The shape of the "cloud" to draw. Can be any polar equation represented as a
          // callback function, or a keyword present. Available presents are circle (default),
          // cardioid (apple or heart shape curve, the most known polar equation), diamond (
          // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

          shape,

          // A silhouette image which the white area will be excluded from drawing texts.
          // The shape option will continue to apply as the shape of the cloud to grow.

          maskImage: maskImage ? mask : null,

          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
          // Default to be put in the center and has 75% x 80% size.

          left: 'center',
          top: 'center',
          width,
          height,
          // right: null,
          // bottom: null,

          // Text size range which the value in data will be mapped to.
          // Default to have minimum 12px and maximum 60px size.

          sizeRange,

          // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

          rotationRange,
          rotationStep,

          // size of the grid in pixels for marking the availability of the canvas
          // the larger the grid size, the bigger the gap between words.
          // 网格的大小(以像素为单位)，用于标记画布的可用性
          // 网格越大，单词之间的间隔越大。
          gridSize,

          // set to true to allow word being draw partly outside of the canvas.
          // Allow word bigger than the size of the canvas to be drawn
          drawOutOfBound: false,

          // Global text style
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: () =>
                // Random color
                `rgb(${[
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',')})`,
            },
            emphasis: {
              shadowBlur: 5,
              shadowColor: '#333',
            },
          },

          // Data is an array. Each array item must have name and value property.
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

WordCloud.defaultProps = {
  shape: 'circle',
  width: '80%',
  height: '80%',
  sizeRange: [2, 60],
  rotationRange: [-90, 90],
  rotationStep: 45,
  gridSize: 1,
  dataset: [],
};

export default WordCloud;
