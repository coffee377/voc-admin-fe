import ReactEcharts from 'echarts-for-react';
import React, { Fragment } from 'react';
import echarts from 'echarts';
import { HeFei } from './map/3401';
import { StyleProps } from '@/typings';
import { EventMap } from '@/components/Echarts';
import { mixin } from '@/utils/merge';

export interface MapProps {
  geoJson: object;
  mapName: string;
  specialAreas?: object;
}

export interface GeoProps extends StyleProps {
  /**
   * 显示加载动画
   */
  loading?: boolean;
  /**
   * 注册地图配置
   */
  mapProps?: MapProps;
  /**
   * 地图显示长宽比
   */
  aspectScale?: number;
  /**
   * echarts 配置
   */
  option?: object;
  /**
   * 是否轮播
   */
  carousel?: boolean;
  /**
   * 乱播间隔时间，单位:秒
   */
  carouselInterval?: number;
  /**
   * 自定义乱播名称排序
   */
  carouselNamesRank?: string[];
  /**
   * 轮播开始项，地区名称或位置索引，从0开始
   */
  carouselStart?: string | number;
  /**
   * 地图切换后调函数
   * @param name 地区名称
   */
  carouselCallback?: (name: string) => void;
}

class Geo extends React.PureComponent<GeoProps> {
  // echarts 实例
  private echartsInstance = null;

  // 计时器
  private timeTicket = null;

  private selectedIndex: string | number;

  // 是否暂停轮播
  private carousePause: boolean = false;

  // 地图注册事件
  private mapEvents: EventMap = {
    dblclick: () => {
      this.toggleAutoSwitch();
    },
    mouseover: () => {
      const { carousel } = this.props;
      if (carousel && !this.carousePause) {
        // console.log('进入');
        this.removeAutoSwitch();
      }
    },
    mouseout: () => {
      const { carousel } = this.props;
      if (carousel && !this.carousePause) {
        // console.log('退出');
        this.addAutoSwitch();
      }
    },
    // 开启轮播触发
    geoselected: (params: any) => {
      this.switchCallback(params);
    },
    // 鼠标点击触发
    geoselectchanged: (params: any) => {
      this.switchCallback(params);
    },
  };

  // 默认属性
  static defaultProps = {
    mapProps: {
      mapName: '3401',
      geoJson: HeFei,
    },
    aspectScale: 0.75,
    carousel: true,
    carouselInterval: 5,
  };

  componentDidMount(): void {
    const { carousel } = this.props;
    if (carousel) {
      // 轮播开启时选中开始项
      this.selectArea(this.getStartAreaName());

      // 自动切换
      this.addAutoSwitch();
    }
  }

  componentWillUnmount(): void {
    const { carousel } = this.props;
    if (carousel) {
      this.removeAutoSwitch();
    }
  }

  // 地图切换后回调函数
  switchCallback = (params: { name: string } & { batch: { name: string }[] }) => {
    const { carouselCallback } = this.props;
    if (carouselCallback) {
      carouselCallback(params.name || params.batch[0].name || '');
    }
  };

  // 获取地区轮播排序名称
  getAreaNames = () => {
    const { carouselNamesRank, mapProps } = this.props;
    if (carouselNamesRank && carouselNamesRank.length > 0) {
      return carouselNamesRank;
    }
    if ('geoJson' in mapProps) {
      return Array.from(mapProps.geoJson.features, v => v.properties.name);
    }
    return [];
  };

  // 获取开始选中地区
  getStartAreaName = () => {
    const names = this.getAreaNames();
    const { carouselStart } = this.props;

    if (typeof carouselStart === 'string') {
      const i = names.findIndex(value => value === carouselStart);
      if (i >= 0) {
        this.selectedIndex = i;
        return carouselStart;
      }
    }

    if (typeof carouselStart === 'number' && carouselStart >= 0 && carouselStart < names.length) {
      this.selectedIndex = carouselStart;
      return names[carouselStart];
    }
    this.selectedIndex = 0;
    return names[0];
  };

  // 自动切换
  addAutoSwitch = () => {
    const { carouselInterval } = this.props;
    if (!this.timeTicket) {
      this.timeTicket = setInterval(() => {
        const names = this.getAreaNames();
        this.selectArea(names[this.selectedIndex]);
        this.selectedIndex = (this.selectedIndex + 1) % names.length;
      }, carouselInterval * 1000);
    }
  };

  // 移除自动切换
  removeAutoSwitch = () => {
    clearInterval(this.timeTicket);
    this.timeTicket = null;
  };

  // 选中地图区域
  selectArea = (name: string) => {
    if (this.echartsInstance) {
      this.echartsInstance.dispatchAction({
        type: 'geoSelect',
        name,
      });
    }
  };

  toggleAutoSwitch = () => {
    const { carousel } = this.props;
    if (carousel) {
      this.carousePause = !this.carousePause;
      if (this.carousePause) {
        this.removeAutoSwitch();
      } else {
        this.addAutoSwitch();
      }
    }
  };

  getOption = () => {
    const { aspectScale, mapProps, option } = this.props;
    const innerOption = {
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
        map: 'mapName' in mapProps ? mapProps.mapName : Geo.defaultProps.mapProps.mapName,
        aspectScale,
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
    // 合并配置
    return mixin(innerOption, option);
  };

  render(): React.ReactNode {
    const { mapProps } = this.props;

    /* 注册地图 */
    if (mapProps) {
      echarts.registerMap(mapProps.mapName, mapProps.geoJson, mapProps.specialAreas);
    }

    return (
      <Fragment>
        <ReactEcharts
          ref={(e: any) => {
            if (e && e.getEchartsInstance) {
              this.echartsInstance = e.getEchartsInstance();
            }
          }}
          showLoading={this.props.loading}
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
