import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { StyleProps, WithFalse } from '@/typings';
import Marquee from '@/components/Marquee';
import GridLayout, { Item } from '@/layouts/GridLayout';

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
 * @param field Field[]
 * @return Item[]
 */
type CalcRankHeader = (field: Field[]) => Item[];

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

export interface RankProps extends StyleProps {
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
  filed: Field[],
  rankingRender?: RankingRender,
  data?: RankData,
  header?: boolean,
) => {
  const items: Item[] = [];
  filed.forEach((value, col) => {
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

const calcHeader: CalcRankHeader = (filed: Field[]) => {
  let items: Item[] = [];
  items = items.concat(getItems('R0', filed, undefined, undefined, true));
  return items;
};

/**
 * 计算列占比
 * @param header
 */
const gridColumns = (header: Item[]) => '1fr 5fr 2fr';

const calcItems: CalcGridLayoutItems = (data, filed, rankingRender) => {
  let items: Item[] = [];
  data.forEach((item, row) => {
    items = items.concat(getItems(`R${row + 1}`, filed, rankingRender, item));
  });
  return items;
};

const Rank: React.FC<RankProps> = props => {
  const { title, titleStyle, dataset, filed, rankingRender, className } = props;
  const rankHeader = calcHeader(filed);
  const gridTemplateColumns = gridColumns(rankHeader);

  const rankTitle = (
    <GridLayout
      header={title && <span style={{ textAlign: 'left', ...titleStyle }}>{title}</span>}
      gridContainerStyle={{ gridTemplateColumns }}
      items={rankHeader}
    />
  );
  const data = calcData(dataset as RankData[]);
  const rankItems = calcItems(data, filed as Field[], rankingRender);

  return (
    <Marquee title={rankTitle}>
      <GridLayout
        gridContainerStyle={{ gridTemplateColumns }}
        items={rankItems}
        className={classNames('rank', className)}
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
  dataset: [],
  filed: [
    ['ranking', { show: true, alias: '排名', align: 'center' } as FieldInfo],
    ['name', { show: true, alias: '名称', align: 'left' } as FieldInfo],
    ['value', { show: true, alias: '数值', align: 'right' } as FieldInfo],
  ],
  rowNum: 5,
  waitTime: 2000,
  carousel: 'seamless',
  unit: '',
};

export default Rank;
