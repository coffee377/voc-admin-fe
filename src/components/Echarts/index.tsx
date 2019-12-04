import echarts from 'echarts';
import * as React from 'react';
import { StyleProps, WithFalse } from '@/typings';

export type Func = (...args: any[]) => any;

/* EChars 事件 */
export interface EventMap {
  [key: string]: Func;
}

/**
 * 组件通用属性
 */
export interface CommonProps extends StyleProps {
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
   * 主题
   */
  theme?: object | string;
  /**
   * echarts 配置
   */
  option?: object;
}

export interface EChartsPropsTypes extends StyleProps {
  // echarts: any;
  // https://www.echartsjs.com/zh/api.html#echarts.init
  theme?: object | string;
  opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  // https://www.echartsjs.com/zh/api.html#echartsInstance.setOption
  option: object;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  // opts?: Object;
  // https://www.echartsjs.com/zh/api.html#echartsInstance.showLoading
  showLoading?: boolean;
  onEvents?: EventMap;
  onChartReady?: Func;
  callback?: (echartsInstance: echarts.ECharts) => void;
}

class ECharts extends React.PureComponent<EChartsPropsTypes> {
  private echartsLib: any;

  private echartsInstance: echarts.ECharts;

  private echartsElement: HTMLDivElement | HTMLCanvasElement;

  constructor(props) {
    super(props);
    this.echartsLib = echarts; // the echarts object.
    // this.echartsElement = null; // echarts div element
  }

  componentWillMount(): void {}

  componentDidMount(): void {}

  componentDidUpdate(
    prevProps: Readonly<EChartsPropsTypes>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {}

  // return the echarts instance
  getEchartsInstance = () =>
    this.echartsLib.getInstanceByDom(this.echartsElement) ||
    this.echartsLib.init(this.echartsElement, this.props.theme, this.props.opts);

  // dispose echarts and clear size-sensor
  dispose = () => {
    if (this.echartsElement) {
      try {
        // clear(this.echartsElement);
      } catch (e) {
        console.warn(e);
      }
      // dispose echarts instance
      this.echartsLib.dispose(this.echartsElement);
    }
  };

  render(): React.ReactNode {
    const { style, className } = this.props;
    return (
      <div
        ref={e => {
          if (e) {
            this.echartsElement = e;
          }
        }}
        style={{ height: 300, ...style }}
        className={`echarts-for-react ${className}`}
      />
    );
  }
}
