import echarts from 'echarts';
import { StyleProps } from '@/typings';
import * as React from 'react';

export type Func = (...args: any[]) => any;

/* EChars 事件 */
export interface EventMap {
  [key: string]: Func;
}

export interface EChartsPropsTypes extends StyleProps {
  // echarts: any;
  //https://www.echartsjs.com/zh/api.html#echarts.init
  theme?: object | string;
  opts?: {
    devicePixelRatio?: number;
    renderer?: string;
    width?: number | string;
    height?: number | string;
  };
  //https://www.echartsjs.com/zh/api.html#echartsInstance.setOption
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

  componentDidMount(): void {}

  componentDidUpdate(
    prevProps: Readonly<EChartsPropsTypes>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {}

  componentWillMount(): void {}

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
