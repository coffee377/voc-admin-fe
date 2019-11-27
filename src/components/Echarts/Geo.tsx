import ReactEcharts from 'echarts-for-react';
import React, { Fragment } from 'react';
import echarts from 'echarts';
import { HeFei } from './map/3401';
import { EchartsEvent, StyleProps } from '@/typings';
import { ReactEchartsAPI } from '@/components/Echarts/echats';
// import merge from 'merge';
export interface MapProps {
  mapName: string;
  geoJson: object;
  specialAreas?: object;
}
// echarts.registerMap('3401', HeFei);
export interface GeoProps extends StyleProps {
  aspectScale?: number;
  mapProps?: MapProps;
  // events?: EchartsEvent;
  option?: any;
  callback?: (instance: echarts.ECharts) => void;
  // echartsReact?: any;
  // echartsInstance?: echarts.ECharts;
  // 地图切换时的回调函数
  switchCallback?: (name: string) => void;
  name?: string[];
  /**
   * 是否轮播
   */
  carousel?: boolean;
  /**
   * 乱播间隔时间，单位:秒
   */
  carouselInterval?: number;
  /**
   * 是否暂停轮播
   */
  pause?: boolean;
}

// export interface GeoState {
//   pause: boolean;
//   current: number;
// }

// const option3 = {
//   // backgroundColor: '#404a59',
//   title: {
//     // text: '香港18区人口密度 （2011）',
//   },
//   tooltip: {
//     trigger: 'item',
//   },
//   legend: {
//     orient: 'vertical',
//     top: 'bottom',
//     left: 'right',
//     // data: ['基金收入', '基金支出'],
//     // textStyle: {
//     // color: '#fff',
//     // },
//   },
//
//   // visualMap: {
//   //   min: 100,
//   //   max: 1000,
//   //   // splitNumber: 5,
//   //   // text: ['High', 'Low'],
//   //   calculable: true,
//   //   inRange: {
//   //     color: ['#50a3ba', '#eac736', '#d94e5d'],
//   //     // symbolSize: [10],
//   //   },
//   //   selectedMode: 'single',
//   //   textStyle: {
//   //     color: '#fff',
//   //   },
//   // },
//   geo: {
//     roam: true,
//     aspectScale: 1,
//     zoom: 1.2,
//     scaleLimit: {
//       min: 1.2,
//       max: 3,
//     },
//     nameMap: {},
//     selectedMode: 'single',
//     // selectedMode: 'multiple',
//     label: {
//       show: true,
//       // color: '#fff',
//     },
//     itemStyle: {
//       borderType: 'dotted',
//       // areaColor: '#323c48',
//     },
//     emphasis: {
//       label: {
//         show: true,
//         // color: '#9c3b43',
//       },
//       itemStyle: {
//         borderType: 'dotted',
//         areaColor: '#bfbfbf',
//       },
//     },
//     // regions: [{ name: '肥西县', selected: true }],
//   },
//   // series: [
//   //   //   {
//   //   //     name: '基金收入',
//   //   //     type: 'scatter',
//   //   //     coordinateSystem: 'geo',
//   //   //     geoIndex: 0,
//   //   //     hoverAnimation: true,
//   //   //     // symbol: 'pin',
//   //   //     data: [
//   //   //       { name: '长丰县', value: [117.167564, 32.478018, 100] },
//   //   //       { name: '肥东县', value: [117.469383, 31.88794, 200] },
//   //   //       { name: '肥西县', value: [117.157981, 31.70681, 300] },
//   //   //       { name: '庐江县', value: [117.2878, 31.25555, 400] },
//   //   //       { name: '巢湖市', value: [117.8618, 31.598628, 600] },
//   //   //       { name: '市本级', value: [117.227308, 31.82057, 800] },
//   //   //     ],
//   //   //     tooltip: {
//   //   //       formatter(params: any) {
//   //   //         return `${params.name}</br>${params.seriesName}: ${params.value[2]}`;
//   //   //       },
//   //   //     },
//   //   //   },
//   //   //   {
//   //   //     name: '基金支出',
//   //   //     type: 'scatter',
//   //   //     coordinateSystem: 'geo',
//   //   //     geoIndex: 0,
//   //   //     hoverAnimation: true,
//   //   //     symbol: 'pin',
//   //   //     symbolOffset: [10, 10],
//   //   //     data: [
//   //   //       { name: '长丰县', value: [117.167564, 32.478018, 100] },
//   //   //       { name: '肥东县', value: [117.469383, 31.88794, 200] },
//   //   //       { name: '肥西县', value: [117.157981, 31.70681, 300] },
//   //   //       { name: '庐江县', value: [117.2878, 31.25555, 400] },
//   //   //       { name: '巢湖市', value: [117.8618, 31.598628, 600] },
//   //   //       { name: '市本级', value: [117.227308, 31.82057, 800] },
//   //   //     ],
//   //   //     tooltip: {
//   //   //       formatter(params: any) {
//   //   //         return `${params.name}</br>${params.seriesName}: ${params.value[2]}`;
//   //   //       },
//   //   //     },
//   //   //   },
//   //   // ],
// };
// const Geo: React.FC<GeoProps> = props => {
//   // let echarts_react = null;
//   const { mapProps } = props;
//   const mapName = mapProps.mapName;
//
//   /* 注册地图 */
//   if (mapProps) {
//     echarts.registerMap(mapProps.mapName, HeFei, mapProps.specialAreas);
//   }
//
//   const ops = { ...option3, ...props.option };
//   const geo = { ...ops.geo, map: mapName };
//
//   // let echarts_instance = echarts_react.getEchartsInstance;
//   // console.log(echarts_react);
//   const clickBtn = () => {
//     console.log(props.echartsReact);
//     console.log(props.echartsReact.getEchartsInstance().getDataURL());
//   };
//
//   return (
//     <div>
//       <ReactEcharts
//         ref={(e: any) => {
//           props.echartsReact = e;
//         }}
//         option={{ ...ops, geo }}
//         onEvents={mapEvents}
//         className={props.className}
//         style={props.style}
//       />
//       <div>
//         <button className="a_line" onClick={clickBtn}>
//           click here to get the DataURL of chart.
//         </button>
//       </div>
//     </div>
//   );
// };
//
// Geo.defaultProps = {
//   mapProps: {
//     mapName: '3401',
//     geoJson: HeFei,
//   },
//   // callback: e => {e.dispatchAction()},
// };
//
class Geo extends React.PureComponent<GeoProps> {
  // echarts 实例
  private echartsInstance = null;

  // 计时器
  private timeTicket = null;

  private selectedIndex: number = 0;

  private pause: boolean = false;

  static defaultProps = {
    aspectScale: 0.75,
    carousel: true,
    carouselInterval: 2,
    // names:HeFei.features.
    mapProps: {
      mapName: '3401',
      geoJson: HeFei,
    },
  };




  mapEvents: EchartsEvent = {
    click: (params: any) => {
      const areaName = params.name;
      console.log(areaName);
      // console.log(next);
      // if (carousel) {
      // @ts-ignore
      // this.fetchDataByArea(areaName);
    },
    dblclick: (params: any) => {
      // console.log('双击事件 => ');
      console.log(params);
      this.togglePause();
    },
    mouseover: (params: any) => {
      if (!this.pause) {
        // console.log(`进入 => ${params.name}`);
        this.clearTimeTicket();
      }
    },
    mouseout: (params: any) => {
      if (!this.pause) {
        // console.log(`移出 => ${params.name}`);
        this.addTimeTicket();
      }
    },
  };

  addTimeTicket = () => {
    this.timeTicket = setInterval(() => {
      const names = ['长丰县', '肥东县', '肥西县', '庐江县', '巢湖市', '市本级'];
      this.echartsInstance.dispatchAction({
        type: 'geoSelect',
        name: names[this.selectedIndex],
      });
      this.selectedIndex = (this.selectedIndex + 1) % 6;
    }, this.props.carouselInterval * 1000);
  };

  clearTimeTicket = () => {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
      this.timeTicket = null;
    }
  };

  togglePause = () => {
    if (this.timeTicket) {
      this.clearTimeTicket();
    } else {
      this.addTimeTicket();
    }
    this.pause = !this.pause;
    // console.log(this.pause);
  };

  componentDidMount(): void {
    this.clearTimeTicket();
    this.addTimeTicket();
  }

  componentWillUnmount(): void {
    this.clearTimeTicket();
  }

  getOption = () => {
    const { aspectScale, mapProps, option } = this.props;
    const r = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        top: 'bottom',
        left: 'right',
      },
      geo: {
        roam: true,
        map: mapProps.mapName,
        aspectScale,
        zoom: 1.2,
        scaleLimit: {
          min: 1.2,
          max: 3,
        },
        nameMap: {},
        selectedMode: 'single', // multiple
        label: {
          show: true,
        },
        itemStyle: {
          borderType: 'dotted',
        },
        emphasis: {
          label: {
            show: true,
          },
          itemStyle: {
            borderType: 'dotted',
            areaColor: '#ddd',
          },
        },
      },
    };
    // console.log(r);
    // console.log(option);
    // const c = merge(r, option);
    // console.log(c);
    return r;
  };

  render(): React.ReactNode {
    const { mapProps } = this.props;

    /* 注册地图 */
    if (this.props.mapProps) {
      echarts.registerMap(mapProps.mapName, HeFei, mapProps.specialAreas);
    }

    // const ops = { ...option3, ...this.props.option };
    // const geo = { ...ops.geo, map: mapName };
    return (
      <Fragment>
        <ReactEcharts
          ref={(e: ReactEchartsAPI) => {
            if (e && e.getEchartsInstance) {
              this.echartsInstance = e.getEchartsInstance();
            }
          }}
          option={this.getOption()}
          onEvents={this.mapEvents}
          className={this.props.className}
          style={this.props.style}
        />
      </Fragment>
    );
  }
}

export default Geo;
