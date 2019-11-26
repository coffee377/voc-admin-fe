import React from 'react';
import { EchartsEvent, StyleProps } from '@/typings';
import './layout.less';
import GridLayout, { Item } from '@/layouts/GridLayout';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import { HeFei } from '@/layouts/3401';

echarts.registerMap('3401', HeFei);

export interface DemonLayoutProps extends Partial<StyleProps> {
  header?: React.ReactNode;
  item1?: React.ReactNode;
  item2?: React.ReactNode;
  item3?: React.ReactNode;
  item4?: React.ReactNode;
  item5?: React.ReactNode;
  item6?: React.ReactNode;
  footer?: React.ReactNode;
}

const DemonLayout: React.FC<DemonLayoutProps> = props => {
  const items: Item[] = [];
  items.push({ content: props.item1, className: 'ui-grid-item1' } as Item);
  items.push({ content: props.item2, className: 'ui-grid-item2' } as Item);
  items.push({ content: props.item3, className: 'ui-grid-item3' } as Item);
  items.push({ content: props.item4, className: 'ui-grid-item4' } as Item);
  items.push({ content: props.item5, className: 'ui-grid-item5' } as Item);
  items.push({ content: props.item6, className: 'ui-grid-item6' } as Item);
  return <GridLayout header={props.header} items={items} footer={props.footer} />;
};

const option1 = {
  title: {
    text: '某地区蒸发量和降水量',
    subtext: '纯属虚构',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    bottom: 0,
    type: 'scroll',
    data: ['蒸发量', '降水量'],
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '蒸发量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
    {
      name: '降水量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      markPoint: {
        data: [
          { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }],
      },
    },
  ],
};
const option2 = {
  title: {
    text: '堆叠区域图',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    // bottom: 0,
    y: 'bottom',
    type: 'scroll',
    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '邮件营销',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '联盟广告',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: '视频广告',
      type: 'line',
      stack: '总量',
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: '直接访问',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: '搜索引擎',
      type: 'line',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'top',
        },
      },
      areaStyle: { normal: {} },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
};
const option3 = {
  // backgroundColor: '#404a59',
  title: {
    // text: '香港18区人口密度 （2011）',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    top: 'bottom',
    left: 'right',
    data: ['基金收入', '基金支出'],
    textStyle: {
      // color: '#fff',
    },
  },

  visualMap: {
    min: 100,
    max: 1000,
    // splitNumber: 5,
    // text: ['High', 'Low'],
    calculable: true,
    inRange: {
      color: ['#50a3ba', '#eac736', '#d94e5d'],
      // symbolSize: [10],
    },
    selectedMode: 'single',
    textStyle: {
      color: '#fff',
    },
  },
  geo: {
    // id: '3401',
    map: '3401',
    roam: true,
    aspectScale: 1,
    zoom: 1.2,
    scaleLimit: {
      min: 1.2,
      max: 3,
    },
    nameMap: {},
    selectedMode: 'single',
    label: {
      show: true,
      // color: '#fff',
    },
    itemStyle: {
      borderType: 'dotted',
      // areaColor: '#323c48',
    },
    emphasis: {
      label: {
        show: true,
        // color: '#9c3b43',
      },
      itemStyle: {
        borderType: 'dotted',
        areaColor: '#bfbfbf',
      },
    },
    // regions: [{ name: '肥西县', selected: true }],
  },
  series: [
    {
      name: '基金收入',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      hoverAnimation: true,
      // symbol: 'pin',
      data: [
        { name: '长丰县', value: [117.167564, 32.478018, 100] },
        { name: '肥东县', value: [117.469383, 31.88794, 200] },
        { name: '肥西县', value: [117.157981, 31.70681, 300] },
        { name: '庐江县', value: [117.2878, 31.25555, 400] },
        { name: '巢湖市', value: [117.8618, 31.598628, 600] },
        { name: '市本级', value: [117.227308, 31.82057, 800] },
      ],
      tooltip: {
        formatter(params: any) {
          return `${params.name}</br>${params.seriesName}: ${params.value[2]}`;
        },
      },
    },
    {
      name: '基金支出',
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      hoverAnimation: true,
      symbol: 'pin',
      symbolOffset: [10, 10],
      data: [
        { name: '长丰县', value: [117.167564, 32.478018, 100] },
        { name: '肥东县', value: [117.469383, 31.88794, 200] },
        { name: '肥西县', value: [117.157981, 31.70681, 300] },
        { name: '庐江县', value: [117.2878, 31.25555, 400] },
        { name: '巢湖市', value: [117.8618, 31.598628, 600] },
        { name: '市本级', value: [117.227308, 31.82057, 800] },
      ],
      tooltip: {
        formatter(params: any) {
          return `${params.name}</br>${params.seriesName}: ${params.value[2]}`;
        },
      },
    },
  ],
};

const option5 = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    // orient: 'vertical',
    // x: 'left',
    y: 'bottom',
    type: 'scroll',
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center',
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' },
      ],
    },
  ],
};
const option6 = {
  title: {
    text: '雷达图',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    x: 'center',
    y: 'bottom',
    type: 'scroll',
    data: ['降水量', '蒸发量'],
  },
  radar: [
    {
      indicator: (function() {
        const res = [];
        for (let i = 1; i <= 12; i++) {
          res.push({ text: `${i}月`, max: 100 });
        }
        return res;
      })(),
      center: ['50%', '48%'],
      radius: 95,
    },
  ],
  series: [
    {
      type: 'radar',
      // radarIndex: 2,
      itemStyle: { normal: { areaStyle: { type: 'default' } } },
      data: [
        {
          name: '降水量',
          value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
        },
        {
          name: '蒸发量',
          value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3],
        },
      ],
    },
  ],
};

const mapEvents: EchartsEvent = {
  click: (params: any) => {
    const areaName = params.name;
    console.log(params);
    // console.log(next);
    // if (carousel) {
    // @ts-ignore
    // this.fetchDataByArea(areaName);
  },
  dblclick: (params: any) => {
    console.log('双击事件 => ');
    console.log(params);
    // this.togglePause();
  },
  mouseover: (params: any) => {
    // console.log(`进入 => ${params.name}`);
    // this.togglePause();
  },
  mouseout: (params: any) => {
    // console.log(`移出 => ${params.name}`);
  },
  mapSelectChanged: (a: any) => {
    // TODO: 2019/10/29 18:35 切换数据
    // const areaName = a.batch[0].name;
    // const areaArray = [
    //   ['340121', '340122', '340123', '340124', '340181', '340199'],
    //   ['长丰县', '肥东县', '肥西县', '庐江县', '巢湖市', '市本级'],
    // ];
    // let pos = 0;
    // areaArray[1].forEach((value, index) => {
    //   if (value === areaName) {
    //     pos = index;
    //   }
    // });
    // const area = areaArray[0][pos];
    // console.log(`${areaName}`);
    // if (carousel) {
    //   carousel(area);
    // }
  },
  // mapselected: (a:any) => {
  //   console.log(a.batch[0].name);
  // },
};

/* 默认属性 */
DemonLayout.defaultProps = {
  header: 'this is title',
  footer: 'this is footer',
  item1: <ReactEcharts option={option1} />,
  item2: <ReactEcharts option={option2} />,
  item3: <ReactEcharts option={option3} onEvents={mapEvents} style={{ height: '385px' }} />,
  item4: <ReactEcharts option={option3} onEvents={mapEvents} style={{ height: '215px' }} />,
  item5: <ReactEcharts option={option5} />,
  item6: <ReactEcharts option={option6} />,
};

export default DemonLayout;
