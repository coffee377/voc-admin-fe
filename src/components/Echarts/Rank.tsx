import React, { useRef } from 'react';
import { Table } from 'antd';
import { StyleProps, WithFalse } from '@/typings';
import { CommonProps } from '@/components/Echarts/index';
import Marquee from '@/components/Marquee';

export interface RankData {
  ranking?: number;
  value: number;
}

export interface RankProps extends StyleProps {
  /**
   * 标题
   */
  title?: WithFalse<string>;
  /**
   * 显示加载动画
   */
  loading?: boolean;
  /**
   * 主题
   */
  theme?: object | string;
  /**
   * @description Rank data
   * @type {Array<RankData>}
   * @default data = []
   */
  dataset?: RankData[] | [];
  /**
   * @description Row num
   * @type {Number}
   * @default rowNum = 5
   */
  rowNum?: number | 5;
  /**
   * @description Scroll wait time
   * @type {Number}
   * @default waitTime = 2000
   */
  waitTime?: number;
  /**
   * @description Carousel type
   * @type {String}
   * @default carousel = 'seamless'
   * @example carousel = 'single' | 'seamless'
   */
  carousel?: 'single' | 'seamless';
  /**
   * @description Value unit
   * @type {String}
   * @default unit = ''
   * @example unit = 'ton'
   */
  unit?: string;
}

const calcRows = () => {};

const data: any[] = [
  {
    index: 1,
    source: '中国科学技术大学附属第一医院(安徽省立医院)',
    value: 16767.46,
  },
  {
    index: 2,
    source: '安徽医科大学第一附属医院',
    value: 11652.37,
  },
  {
    index: 3,
    source: '安徽中医药大学第一附属医院',
    value: 6408.0,
  },
  {
    index: 4,
    source: '中国人民解放军联勤保障部队第九〇一医院',
    value: 2183.84,
  },
  {
    index: 5,
    source: '武警安徽总队医院',
    value: 1445.04,
  },
];

const columns: any[] = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    render: (text, record, index) => <div>{text}</div>,
  },
  {
    title: '医疗机构',
    dataIndex: 'source',
    key: 'source',
    align: 'left',
  },
  {
    title: '金额（万）',
    dataIndex: 'value',
    key: 'value',
    align: 'right',
    render: text => text.toFixed(2),
  },
];

const Rank: React.FC<RankProps> = props => {
  const domRef = useRef();

  const { dataset, style, className } = props;
  return (
    <Marquee>
      <Table
        // className={styles.rankTable}
        // rowKey={(record: RankDataType) => record.source}
        title={() => <span style={{}}>医院总费用Top5</span>}
        dataSource={data}
        columns={columns}
        pagination={false}
        style={{ height: '100%', overflow: 'hidden' }}
        // bordered
      />
    </Marquee>
  );
};

Rank.defaultProps = {
  dataset: [],
  rowNum: 5,
  waitTime: 2000,
  carousel: 'seamless',
  unit: '',
};

export default Rank;
