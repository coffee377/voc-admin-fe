import React, { CSSProperties } from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { TableProps } from 'antd/lib/table/interface';
import echarts from 'echarts';
import { WithFalse } from '@/typings';
import Marquee, { MarqueeProps } from '@/components/Marquee';
import styles from './style.less';
import { mixin } from '@/utils/merge';

export interface RankData {
  ranking?: number;
  percent?: number;
  name: string;
  value: number;
  [key: string]: any;
}

/**
 * @description 排序数据并计算名次
 * @param input RankData[]
 * @return RankData[]
 */
type CalcRankData = (input: RankData[]) => RankData[];

export interface RankProps extends MarqueeProps {
  /**
   * @description 标题
   */
  title?: WithFalse<string>;
  /**
   * @description 标题样式
   */
  titleStyle?: CSSProperties;
  /**
   * @description 显示头部
   */
  showHeader?: boolean;
  /**
   * @description 显示加载动画
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
  dataset?: RankData[];
  /**
   * @description 列描述
   */
  columns?: ColumnProps<RankData>[];
}

/**
 * 数据计算名次并排序
 * @param data RankData[]
 */
const calcData: CalcRankData = (data: RankData[]) => {
  // 1.数据降序排序
  data.sort(({ value: a }, { value: b }) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  });

  // 2.求最大值
  const value = data.map(({ value }) => value);
  const max = Math.max(...value) || 0;

  // 3.返回最终计算结果
  return data.map((row, i) => ({
    ...row,
    ranking: i + 1, // 名称
    percent: (row.value / max) * 100, // 百分比
  }));
};

/**
 * 获取已注册的主题，未找到主题返回默认值
 * @param name 主题名称
 * @default default
 */
// todo echarts注册主题获取,目前没有接口获取已注册的主题,或者注册主题时存储注册相关信息
const getTheme4Name: (name: string) => object = (name: string) => ({});
/**
 * 从主题获取指定颜色
 * @param theme 主题
 * @param index 颜色索引位置
 * @param defaultColor 默认颜色 #d7d7d7
 */
const getColor4Theme = (
  theme: string | object,
  index: number,
  defaultColor: string = '#d7d7d7',
) => {
  let themeObj: object;
  switch (typeof theme) {
    case 'string':
      themeObj = getTheme4Name(theme);
      break;
    case 'object':
      themeObj = theme;
      break;
    case 'undefined':
    default:
      themeObj = getTheme4Name('default');
  }
  const colors: string[] = themeObj['color'];
  if (index >= 0 && index < colors.length) {
    return colors[index];
  }
  return defaultColor;
};

const getColumns: (
  columns: ColumnProps<RankData>[],
  theme: string | object,
) => ColumnProps<RankData>[] = (columns, theme) => {
  const inner: ColumnProps<RankData>[] = [
    {
      dataIndex: 'ranking',
      align: 'center',
      width: '60px',
      render: (text, record, index) => {
        if (typeof text === 'number') {
          const backgroundColor = getColor4Theme(theme, index);
          return (
            <div className={styles.top} style={{ backgroundColor }}>
              {text}
            </div>
          );
        }
        return text;
      },
    },
    {
      dataIndex: 'name',
      align: 'left',
    },
    {
      dataIndex: 'value',
      align: 'right',
      width: '120px',
      render: text => {
        if (typeof text === 'number') {
          return text.toFixed(2);
        }
        return String(text);
      },
    },
  ];
  return mixin(inner, columns || []) as ColumnProps<RankData>[];
};

const Rank: React.FC<RankProps> = props => {
  const { title, titleStyle, showHeader, dataset, theme } = props;

  const columns = getColumns(props.columns as ColumnProps<RankData>[], theme);

  const getHeaderData = (columns: ColumnProps<RankData>[]) => {
    const header: object = {};
    columns.every(item => {
      const key: string = item.dataIndex || '';
      if (key === '') {
        return true;
      }
      if (key === 'ranking') {
        header[key] = item.title || 'No.';
      } else {
        header[key] = item.title || item.dataIndex?.toUpperCase();
      }
      return true;
    });
    return [header];
  };

  const tableProps: TableProps<any> = {
    className: styles.rankTable,
    rowKey: record => String(record.ranking),
    columns,
    showHeader: false,
    pagination: false,
  };

  const rankTitle = (
    <>
      {title && <div style={mixin(Rank.defaultProps!.titleStyle, titleStyle)}>{title}</div>}
      {showHeader && (
        <Table
          {...tableProps}
          dataSource={getHeaderData(columns)}
          className={styles.rankTableHeader}
        />
      )}
    </>
  );

  const data = calcData(dataset as RankData[]);

  return (
    <Marquee {...props} title={rankTitle}>
      <Table {...tableProps} dataSource={data} />
    </Marquee>
  );
};

Rank.defaultProps = {
  title: '',
  titleStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: 18,
    margin: '0 6px 6px',
  },
  showHeader: false,
  loading: false,
  theme: {
    color: [
      '#C23531',
      '#2F4554',
      '#61A0A8',
      '#D48265',
      '#91C7AE',
      '#749F83',
      '#CA8622',
      '#BDA29A',
      '#6E7074',
      '#546570',
      '#C4CCD3',
    ],
  },
  dataset: [],
  // columns: [{ title: '名次' }, { title: '医疗机构' }, { title: '金额（万）' }],
};

export default Rank;
