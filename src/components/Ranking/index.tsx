import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { Table } from 'antd';
import { WithFalse } from '@/typings';
import Marquee, { MarqueeProps } from '@/components/Marquee';
import GridLayout, { Item } from '@/layouts/GridLayout';
import styles from './style.less';

export interface RankData {
  ranking?: number;
  percent?: number;
  name: string;
  value: number;
  [key: string]: any;
}

export interface FieldInfo {
  /**
   * @description 是否展示
   */
  show?: boolean;
  /**
   * @description 展示表名
   */
  alias?: string;
  /**
   * @description 宽度
   */
  width?: number | string;
  /**
   * @description 文字对齐方式
   */
  align?: 'left' | 'center' | 'right';
}

export type Field = string | [string, FieldInfo];

export type RankingRender = (ranking: number) => React.ReactNode;

/**
 * @description 排序数据并计算名次
 * @param input RankData[]
 * @return RankData[]
 */
type CalcRankData = (input: RankData[]) => RankData[];

/**
 * @description 获取排序头
 * @param field {Field[]}
 * @param unit {string}
 * @return Item[]
 */
type CalcRankHeader = (field: Field[], unit?: string) => Item[];

/**
 * @description 生成 GridLayout 数据项
 * @param data RankData[]
 * @param field string[]
 * @param rankingRender RankingRender
 * @return Item[]
 */
type CalcGridLayoutItems = (
  data: RankData[],
  field: Field[],
  rankingRender?: RankingRender,
) => Item[];

export interface RankProps extends MarqueeProps {
  /**
   * 标题
   */
  title?: WithFalse<string>;
  /**
   * 标题样式
   */
  titleStyle?: CSSProperties;
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
  dataset?: RankData[];
  /**
   * @description 字段描述
   */
  field?: Field[];
  /**
   * @description 名次渲染
   * @return RankingRender
   */
  rankingRender?: RankingRender;
  /**
   * @description Value unit
   * @type {String}
   * @default unit = ''
   * @example unit = 'ton'
   */
  unit?: string;
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

const getItems = (
  row: string,
  field: Field[],
  rankingRender?: RankingRender,
  data?: RankData,
  unit?: string,
  header?: boolean,
) => {
  const items: Item[] = [];
  field.forEach((value, col) => {
    // 1.获取键名及配置信息
    let f: [string, FieldInfo];
    if (typeof value === 'string') {
      f = [value, { show: true, alias: '', align: 'center' }];
    } else if (Array.isArray(value)) {
      f = value;
    } else {
      return;
    }
    const fieldKey = f[0]; // 数据键名
    const fieldInfo = f[1]; // 字段配置信息

    // 2.构建展示数据
    if (fieldInfo.show) {
      let itemContent: React.ReactNode = fieldInfo.alias || fieldKey;
      if (fieldKey === 'value' && unit) {
        itemContent += unit;
      }
      if (!header) {
        if (fieldKey === 'ranking' && rankingRender) {
          itemContent = rankingRender(data[fieldKey] as number);
        } else {
          itemContent = data[fieldKey];
        }
      }
      items.push({
        key: `${row}_C${col + 1}`,
        field: fieldKey,
        content: itemContent,
        style: { textAlign: fieldInfo.align || 'center' },
      } as Item);
    }
  });
  return items;
};

const calcHeader: CalcRankHeader = (field, unit) => {
  let items: Item[] = [];
  items = items.concat(getItems('R0', field, undefined, undefined, unit, true));
  return items;
};

/**
 * 计算列占比
 * @param header
 */
const gridColumns = (header: Item[]) => `60px repeat(${header.length - 2}, 1fr) 100px`;

const calcItems: CalcGridLayoutItems = (data, field, rankingRender) => {
  let items: Item[] = [];
  data.forEach((item, row) => {
    items = items.concat(getItems(`R${row + 1}`, field, rankingRender, item));
  });
  return items;
};

const Rank: React.FC<RankProps> = props => {
  const { title, titleStyle, dataset, field, unit, rankingRender, className } = props;
  // console.log(field);
  const rankHeader = calcHeader(field as Field[], unit);
  const gridTemplateColumns = gridColumns(rankHeader);
  const gridItemStyle = { borderBottom: '1px dashed grey' };
  const rankTitle = (
    <GridLayout
      header={
        title && <div style={{ margin: '0 5px', textAlign: 'left', ...titleStyle }}>{title}</div>
      }
      gridContainerStyle={{ gridTemplateColumns }}
      // gridItemStyle={gridItemStyle}
      items={rankHeader}
    />
  );
  const data = calcData(dataset as RankData[]);
  const rankItems = calcItems(data, field as Field[], rankingRender);
  return (
    <Marquee {...props}>
      {/* <GridLayout */}
      {/*  gridContainerStyle={{ gridTemplateColumns, gap: '0px 1px' }} */}
      {/*  gridItemStyle={gridItemStyle} */}
      {/*  items={rankItems} */}
      {/*  className={classNames('rank', className)} */}
      {/* /> */}
      <Table
        className={styles.rankTable}
        rowKey={record => record.ranking}
        dataSource={data}
        columns={[
          {
            // title: '排名',
            dataIndex: 'ranking',
            align: 'center',
            width: '60px',
            render: text => (rankingRender ? rankingRender(text) : text),
          },

          {
            // title: '医疗机构',
            dataIndex: 'name',
            align: 'left',
            // ellipsis: true,
            render: (text, record, index) => <div>{text}</div>,
          },
          {
            // title: '金额（万）',
            dataIndex: 'value',
            align: 'right',
            width: '100px',
            render: text => text.toFixed(2),
          },
        ]}
        showHeader={false}
        pagination={false}
      />
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
  },
  loading: false,
  theme: null,
  dataset: [],
  field: [
    ['ranking', { show: true, alias: '排名', align: 'center' } as FieldInfo],
    ['name', { show: true, alias: '名称', align: 'left' } as FieldInfo],
    ['value', { show: true, alias: '数值', align: 'right' } as FieldInfo],
  ],
  rankingRender: ranking => <div className={styles.top}>{ranking}</div>,
  unit: '',
};

export default Rank;
