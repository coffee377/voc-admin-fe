import React from 'react';
import classNames from 'classnames';
import { StyleProps } from '@/typings';
import './layout.less';
import GridLayout, { Item } from '@/layouts/GridLayout';
import Geo from '@/components/Echarts/Geo';
import Bar from '@/components/Echarts/Bar';
import Line from '@/components/Echarts/Line';
import Pie from '@/components/Echarts/Pie';
import Radar from '@/components/Echarts/Radar';
import Gauge from '@/components/Echarts/Gauge';
import Rank from '@/components/Ranking/';
import Marquee from '@/components/Marquee';

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
  items.push({ key: 'item1', content: props.item1, className: 'ui-grid-item1' } as Item);
  items.push({ key: 'item2', content: props.item2, className: 'ui-grid-item2' } as Item);
  items.push({ key: 'item3', content: props.item3, className: 'ui-grid-item3' } as Item);
  items.push({ key: 'item4', content: props.item4, className: 'ui-grid-item4' } as Item);
  items.push({ key: 'item5', content: props.item5, className: 'ui-grid-item5' } as Item);
  items.push({ key: 'item6', content: props.item6, className: 'ui-grid-item6' } as Item);
  return (
    <GridLayout
      header={props.header}
      items={items}
      footer={props.footer}
      className={classNames('demon', props.className)}
    />
  );
};

const data = [
  { name: 'visualMap', value: 148.99328843944616 },
  { name: 'continuous', value: 101.42977866484773 },
  { name: 'contoller', value: 24.899799195977465 },
  { name: 'series', value: 523.8988451981928 },
  { name: 'gauge', value: 110.95494581135173 },
  { name: 'detail', value: 34.72751070837067 },
  { name: 'piecewise', value: 69.8927750200262 },
  { name: 'textStyle', value: 179.70531433432902 },
  { name: 'markPoint', value: 136.28646301082145 },
  { name: 'pie', value: 197.30433345469126 },
  { name: 'roseType', value: 31.12876483254676 },
  { name: 'label', value: 193.6930561481232 },
  { name: 'emphasis', value: 109.78615577567146 },
  { name: 'yAxis', value: 239.37209528263733 },
  { name: 'name', value: 124.16923934694937 },
  { name: 'type', value: 151.34397906755325 },
  { name: 'gridIndex', value: 71.73562573784382 },
  { name: 'normal', value: 222.4567373670665 },
  { name: 'itemStyle', value: 183.9483623194292 },
  { name: 'min', value: 67.08203932499369 },
  { name: 'silent', value: 75.78918128598566 },
  { name: 'animation', value: 69.57010852370435 },
  { name: 'offsetCenter', value: 15.231546211727817 },
  { name: 'inverse', value: 60.876925020897694 },
  { name: 'borderColor', value: 69.3685807840985 },
  { name: 'markLine', value: 128.7555824032496 },
  { name: 'line', value: 277.43467699622556 },
  { name: 'radiusAxis', value: 81.87795796183488 },
  { name: 'radar', value: 126.34872377669669 },
  { name: 'data', value: 246.33107802305418 },
  { name: 'dataZoom', value: 156.03525242713584 },
  { name: 'tooltip', value: 208.37466256721328 },
  { name: 'toolbox', value: 158.8143570336133 },
  { name: 'geo', value: 130.01538370516005 },
  { name: 'parallelAxis', value: 63.474404290233394 },
  { name: 'parallel', value: 72.9314746868593 },
  { name: 'max', value: 58.249463516842795 },
  { name: 'bar', value: 207.52349264601347 },
  { name: 'heatmap', value: 55.767373974394744 },
  { name: 'map', value: 142.42541907960108 },
  { name: 'animationDuration', value: 58.52349955359813 },
  { name: 'animationDelay', value: 49.3051721424842 },
  { name: 'splitNumber', value: 71.93747284969079 },
  { name: 'axisLine', value: 112.86274850454423 },
  { name: 'lineStyle', value: 140.00357138301865 },
  { name: 'splitLine', value: 84.45708969648433 },
  { name: 'axisTick', value: 93.9734004918413 },
  { name: 'axisLabel', value: 132.34802605252563 },
  { name: 'pointer', value: 24.289915602982237 },
  { name: 'color', value: 153.05554547287727 },
  { name: 'title', value: 196.2065238466856 },
  { name: 'formatter', value: 123.3450444890268 },
  { name: 'slider', value: 85.06468127254695 },
  { name: 'legend', value: 257.9030825717289 },
  { name: 'grid', value: 168.86681142249356 },
  { name: 'smooth', value: 35.98610843089316 },
  { name: 'smoothMonotone', value: 26.38181191654584 },
  { name: 'sampling', value: 27.51363298439521 },
  { name: 'feature', value: 113.20335684068738 },
  { name: 'saveAsImage', value: 51.146847410177685 },
  { name: 'polar', value: 79.24014134263012 },
  { name: 'calculable', value: 29.647934160747187 },
  { name: 'backgroundColor', value: 97.05153270299239 },
  { name: 'excludeComponents', value: 11.40175425099138 },
  { name: 'show', value: 143.59665734271115 },
  { name: 'text', value: 50.91168824543142 },
  { name: 'icon', value: 52.744667976962376 },
  { name: 'dimension', value: 21.863211109075447 },
  { name: 'inRange', value: 32.55764119219941 },
  { name: 'animationEasing', value: 54.616847217685496 },
  { name: 'animationDurationUpdate', value: 47.52893855326458 },
  { name: 'animationDelayUpdate', value: 47.286361670147556 },
  { name: 'animationEasingUpdate', value: 47.042533945356304 },
  { name: 'xAxis', value: 299.096974240797 },
  { name: 'angleAxis', value: 73.95268757793728 },
  { name: 'showTitle', value: 22 },
  { name: 'dataView', value: 52.478567053607705 },
  { name: 'restore', value: 30.528675044947494 },
  { name: 'timeline', value: 100.5186549850325 },
  { name: 'range', value: 21.840329667841555 },
  { name: 'value', value: 75.7099729229908 },
  { name: 'precision', value: 29.631064780058107 },
  { name: 'target', value: 37.8549864614954 },
  { name: 'zlevel', value: 73.21885003194191 },
  { name: 'symbol', value: 93.3702308018996 },
  { name: 'interval', value: 89.24124606929242 },
  { name: 'symbolSize', value: 72.80109889280519 },
  { name: 'showSymbol', value: 35.31288716601915 },
  { name: 'inside', value: 94.40868604106298 },
  { name: 'xAxisIndex', value: 61.99193495931547 },
  { name: 'orient', value: 64.8459713474939 },
  { name: 'boundaryGap', value: 71.22499561249548 },
  { name: 'nameGap', value: 69.9714227381436 },
  { name: 'zoomLock', value: 23.895606290697042 },
  { name: 'hoverAnimation', value: 48.03123983409131 },
  { name: 'legendHoverLink', value: 59.60704656330491 },
  { name: 'stack', value: 53.91660226683428 },
  { name: 'throttle', value: 21.587033144922902 },
  { name: 'connectNulls', value: 29.949958263743873 },
  { name: 'clipOverflow', value: 28.74021572639983 },
  { name: 'startValue', value: 23.473389188611005 },
  { name: 'minInterval', value: 57.37595315112421 },
  { name: 'opacity', value: 55.65069631190611 },
  { name: 'splitArea', value: 69.10137480542626 },
  { name: 'filterMode', value: 25.199206336708304 },
  { name: 'end', value: 20.223748416156685 },
  { name: 'left', value: 80.46738469715541 },
  { name: 'funnel', value: 47.30750469005948 },
  { name: 'lines', value: 80.01874780324921 },
  { name: 'baseline', value: 20.760539492026695 },
  { name: 'align', value: 51.068581339214816 },
  { name: 'coord', value: 29.949958263743873 },
  { name: 'nameTextStyle', value: 86.46964785403026 },
  { name: 'width', value: 65.86349520030045 },
  { name: 'shadowBlur', value: 67.02984409947557 },
  { name: 'effect', value: 30.479501308256342 },
  { name: 'period', value: 15 },
  { name: 'areaColor', value: 25.11971337416094 },
  { name: 'borderWidth', value: 60.44832503882965 },
  { name: 'nameLocation', value: 66.46803743153546 },
  { name: 'position', value: 108.27280360275151 },
  { name: 'containLabel', value: 41.24318125460256 },
  { name: 'scatter', value: 103.52777405121778 },
  { name: 'areaStyle', value: 72.86974680894672 },
  { name: 'scale', value: 62.120849961989414 },
  { name: 'pieces', value: 20.346989949375804 },
  { name: 'categories', value: 31.622776601683793 },
  { name: 'selectedMode', value: 61.84658438426491 },
  { name: 'itemSymbol', value: 16.522711641858304 },
  { name: 'effectScatter', value: 84.53993139339539 },
  { name: 'fontStyle', value: 58.1033561853358 },
  { name: 'fontSize', value: 58.18934610390462 },
  { name: 'margin', value: 32.155870381627054 },
  { name: 'iconStyle', value: 47.50789408087881 },
  { name: 'link', value: 36.959437225152655 },
  { name: 'axisPointer', value: 72.42237223399962 },
  { name: 'showDelay', value: 29.93325909419153 },
  { name: 'graph', value: 148.97650821522163 },
  { name: 'subtext', value: 37.97367509209505 },
  { name: 'selected', value: 53.67494760127857 },
  { name: 'barCategoryGap', value: 28.75760768909681 },
  { name: 'barGap', value: 33.075670817082454 },
  { name: 'barWidth', value: 39 },
  { name: 'coordinateSystem', value: 60.18305409332431 },
  { name: 'barBorderRadius', value: 16.852299546352718 },
  { name: 'z', value: 63.35613624582863 },
  { name: 'polarIndex', value: 38.157568056677825 },
  { name: 'shadowOffsetX', value: 55.190578906186516 },
  { name: 'shadowColor', value: 61.40846847137616 },
  { name: 'shadowOffsetY', value: 49.749371855331 },
  { name: 'height', value: 44.58699361921591 },
  { name: 'barMinHeight', value: 23.979157616563597 },
  { name: 'lang', value: 11.445523142259598 },
  { name: 'symbolRotate', value: 52.459508194416 },
  { name: 'symbolOffset', value: 50.48762224545735 },
  { name: 'showAllSymbol', value: 30.692018506445613 },
  { name: 'transitionDuration', value: 31.51190251317746 },
  { name: 'bottom', value: 61.02458520956943 },
  { name: 'fillerColor', value: 15.132745950421556 },
  { name: 'nameMap', value: 35.34119409414458 },
  { name: 'barMaxWidth', value: 27.331300737432898 },
  { name: 'radius', value: 45.858477951192405 },
  { name: 'center', value: 49.24428900898052 },
  { name: 'magicType', value: 57.23635208501674 },
  { name: 'labelPrecision', value: 15.748015748023622 },
  { name: 'option', value: 25.573423705088842 },
  { name: 'seriesIndex', value: 30.577769702841312 },
  { name: 'controlPosition', value: 11 },
  { name: 'itemGap', value: 56.462376853972415 },
  { name: 'padding', value: 59 },
  { name: 'shadowStyle', value: 18.627936010197157 },
  { name: 'boxplot', value: 37.33630940518894 },
  { name: 'labelFormatter', value: 16.24807680927192 },
  { name: 'realtime', value: 25.11971337416094 },
  { name: 'dataBackgroundColor', value: 15.459624833740307 },
  { name: 'showDetail', value: 15.716233645501712 },
  { name: 'showDataShadow', value: 14.730919862656235 },
  { name: 'x', value: 26.153393661244042 },
  { name: 'valueDim', value: 22.338307903688676 },
  { name: 'onZero', value: 30.512292604784715 },
  { name: 'right', value: 57.05260730238365 },
  { name: 'clockwise', value: 32.17141588429082 },
  { name: 'itemWidth', value: 41.617304093369626 },
  { name: 'trigger', value: 61.96773353931867 },
  { name: 'axis', value: 19.467922333931785 },
  { name: 'selectedOffset', value: 25.88435821108957 },
  { name: 'startAngle', value: 35.958309192730404 },
  { name: 'minAngle', value: 24.289915602982237 },
  { name: 'top', value: 68.09552114493287 },
  { name: 'avoidLabelOverlap', value: 29.49576240750525 },
  { name: 'labelLine', value: 61.5223536610881 },
  { name: 'sankey', value: 54.15717865620402 },
  { name: 'endAngle', value: 14.594519519326424 },
  { name: 'start', value: 27.910571473905726 },
  { name: 'roam', value: 41.689327171351664 },
  { name: 'fontWeight', value: 53.178943201233324 },
  { name: 'fontFamily', value: 49.8998997994986 },
  { name: 'subtextStyle', value: 45.45327270945405 },
  { name: 'indicator', value: 29.206163733020468 },
  { name: 'sublink', value: 26.60826939130014 },
  { name: 'zoom', value: 32.218007387174026 },
  { name: 'subtarget', value: 25.67099530598687 },
  { name: 'length', value: 32.55764119219941 },
  { name: 'itemSize', value: 22.47220505424423 },
  { name: 'controlStyle', value: 21.2602916254693 },
  { name: 'yAxisIndex', value: 50.28916384272063 },
  { name: 'edgeLabel', value: 34.46737587922817 },
  { name: 'radiusAxisIndex', value: 18.81488772222678 },
  { name: 'scaleLimit', value: 36.235341863986875 },
  { name: 'geoIndex', value: 23.130067012440755 },
  { name: 'regions', value: 43.497126341863094 },
  { name: 'itemHeight', value: 35.91656999213594 },
  { name: 'nodes', value: 25.37715508089904 },
  { name: 'candlestick', value: 56.2672195865408 },
  { name: 'crossStyle', value: 21.587033144922902 },
  { name: 'edges', value: 19.209372712298546 },
  { name: 'links', value: 57.245087125446844 },
  { name: 'layout', value: 29.086079144497972 },
  { name: 'barBorderColor', value: 26.851443164195103 },
  { name: 'barBorderWidth', value: 22.315913604421397 },
  { name: 'treemap', value: 62.16912416947821 },
  { name: 'y', value: 19.157244060668017 },
  { name: 'valueIndex', value: 26.5329983228432 },
  { name: 'showLegendSymbol', value: 21.95449840010015 },
  { name: 'mapValueCalculation', value: 22.181073012818835 },
  { name: 'optionToContent', value: 16.24807680927192 },
  { name: 'handleColor', value: 13.674794331177344 },
  { name: 'handleSize', value: 16.46207763315433 },
  { name: 'showContent', value: 43.04648650006177 },
  { name: 'angleAxisIndex', value: 20.149441679609886 },
  { name: 'endValue', value: 18.083141320025124 },
  { name: 'triggerOn', value: 41.47288270665544 },
  { name: 'contentToOption', value: 13 },
  { name: 'buttonColor', value: 8.426149773176359 },
  { name: 'rotate', value: 33.823069050575526 },
  { name: 'hoverLink', value: 18.303005217723125 },
  { name: 'outOfRange', value: 22.15851980616034 },
  { name: 'textareaColor', value: 7.615773105863909 },
  { name: 'textareaBorderColor', value: 7.615773105863909 },
  { name: 'textColor', value: 7.745966692414834 },
  { name: 'buttonTextColor', value: 8.12403840463596 },
  { name: 'category', value: 18.33030277982336 },
  { name: 'hideDelay', value: 28.035691537752374 },
  { name: 'alwaysShowContent', value: 35.59494346111537 },
  { name: 'extraCssText', value: 30.01666203960727 },
  { name: 'effectType', value: 16.64331697709324 },
  { name: 'force', value: 42.661458015403085 },
  { name: 'rippleEffect', value: 26.888659319497503 },
  { name: 'edgeSymbolSize', value: 18.138357147217054 },
  { name: 'showEffectOn', value: 16.46207763315433 },
  { name: 'gravity', value: 14.106735979665885 },
  { name: 'edgeLength', value: 13.892443989449804 },
  { name: 'layoutAnimation', value: 12.328828005937952 },
  { name: 'length2', value: 13 },
  { name: 'enterable', value: 30.93541659651604 },
  { name: 'dim', value: 9.1104335791443 },
  { name: 'readOnly', value: 11.958260743101398 },
  { name: 'levels', value: 21.071307505705477 },
  { name: 'textGap', value: 16 },
  { name: 'pixelRatio', value: 9.16515138991168 },
  { name: 'nodeScaleRatio', value: 15.231546211727817 },
  { name: 'draggable', value: 15.7797338380595 },
  { name: 'brushType', value: 12.569805089976535 },
  { name: 'radarIndex', value: 12.328828005937952 },
  { name: 'large', value: 13.490737563232042 },
  { name: 'edgeSymbol', value: 25.98076211353316 },
  { name: 'largeThreshold', value: 11.489125293076057 },
  { name: 'leafDepth', value: 8.54400374531753 },
  { name: 'childrenVisibleMin', value: 8.54400374531753 },
  { name: 'minSize', value: 5.916079783099616 },
  { name: 'maxSize', value: 5.916079783099616 },
  { name: 'sort', value: 9.486832980505138 },
  { name: 'funnelAlign', value: 7.810249675906654 },
  { name: 'source', value: 18.33030277982336 },
  { name: 'nodeClick', value: 14.142135623730951 },
  { name: 'curveness', value: 18.708286933869708 },
  { name: 'areaSelectStyle', value: 10.198039027185569 },
  { name: 'parallelIndex', value: 7.211102550927978 },
  { name: 'initLayout', value: 18.947295321496416 },
  { name: 'trailLength', value: 10.770329614269007 },
  { name: 'boxWidth', value: 4.47213595499958 },
  { name: 'back', value: 7.280109889280518 },
  { name: 'rewind', value: 10.488088481701515 },
  { name: 'zoomToNodeRatio', value: 8.94427190999916 },
  { name: 'squareRatio', value: 7.745966692414834 },
  { name: 'parallelAxisDefault', value: 18.920887928424502 },
  { name: 'checkpointStyle', value: 20.97617696340303 },
  { name: 'nodeWidth', value: 7 },
  { name: 'color0', value: 7.874007874011811 },
  { name: 'layoutIterations', value: 7.483314773547883 },
  { name: 'nodeGap', value: 7.3484692283495345 },
  { name: 'repulsion', value: 16.61324772583615 },
  { name: 'tiled', value: 10.246950765959598 },
  { name: 'currentIndex', value: 12.041594578792296 },
  { name: 'axisType', value: 15.066519173319364 },
  { name: 'loop', value: 9.848857801796104 },
  { name: 'playInterval', value: 10.583005244258363 },
  { name: 'borderColor0', value: 4.795831523312719 },
  { name: 'gap', value: 6.557438524302 },
  { name: 'autoPlay', value: 11.090536506409418 },
  { name: 'showPlayBtn', value: 5 },
  { name: 'breadcrumb', value: 10.908712114635714 },
  { name: 'colorMappingBy', value: 9.219544457292887 },
  { name: 'id', value: 4.242640687119285 },
  { name: 'blurSize', value: 9.219544457292887 },
  { name: 'minOpacity', value: 7.0710678118654755 },
  { name: 'maxOpacity', value: 7.3484692283495345 },
  { name: 'prevIcon', value: 3.4641016151377544 },
  { name: 'children', value: 4.58257569495584 },
  { name: 'shape', value: 9.899494936611665 },
  { name: 'nextIcon', value: 3.4641016151377544 },
  { name: 'showNextBtn', value: 4.123105625617661 },
  { name: 'stopIcon', value: 4.58257569495584 },
  { name: 'visibleMin', value: 9.1104335791443 },
  { name: 'visualDimension', value: 9.848857801796104 },
  { name: 'colorSaturation', value: 7.483314773547883 },
  { name: 'colorAlpha', value: 8.12403840463596 },
  { name: 'emptyItemWidth', value: 3.1622776601683795 },
  { name: 'inactiveOpacity', value: 2 },
  { name: 'activeOpacity', value: 2 },
  { name: 'showPrevBtn', value: 4.358898943540674 },
  { name: 'playIcon', value: 5.0990195135927845 },
  { name: 'ellipsis', value: 4.358898943540674 },
  { name: 'gapWidth', value: 4.358898943540674 },
  { name: 'borderColorSaturation', value: 3.1622776601683795 },
  { name: 'handleIcon', value: 1.4142135623730951 },
  { name: 'handleStyle', value: 2.449489742783178 },
  { name: 'borderType', value: 1 },
  { name: 'constantSpeed', value: 1 },
  { name: 'polyline', value: 1.4142135623730951 },
  { name: 'blendMode', value: 1 },
  { name: 'dataBackground', value: 1 },
  { name: 'textAlign', value: 1 },
  { name: 'textBaseline', value: 1 },
  { name: 'brush', value: 1.7320508075688772 },
];

/* 默认属性 */
DemonLayout.defaultProps = {
  // header: 'this is title',
  // footer: 'this is footer',
  item1: (
    <Bar
      title="柱状图"
      dataset={[
        ['年份', '居民', '职工'],
        [2017, 94977.29, 79099.08],
        [2018, 87575.34, 79544.33],
        [2019, 64492.29, 65869.1],
      ]}
    />
  ),
  item2: (
    <Line
      title="折线图/堆叠面积图"
      // stack
      dataset={{
        category: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          { name: '邮件营销', value: [120, 132, 101, 134, 90, 230, 210] },
          { name: '联盟广告', value: [220, 182, 191, 234, 290, 330, 310] },
          { name: '视频广告', value: [150, 232, 201, 154, 190, 330, 410] },
          { name: '直接访问', value: [320, 332, 301, 334, 390, 330, 320] },
          { name: '搜索引擎', value: [820, 932, 901, 934, 1290, 1330, 1320] },
        ],
      }}
    />
  ),

  // // item2: (
  // //   <WordCloud
  // //     title="词云/热词分析"
  // //     dataset={data}
  // //     maskImage="data:image/png;base64,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"
  // //   />
  // // ),
  item3: (
    <Geo
      style={{ height: '385px' }}
      aspectScale={1}
      // carouselCallback={name => {
      //   console.log(name);
      // }}
      // carousel={false}
      // carouselNamesRank={['市本级', '巢湖市', '肥东县', '肥西县', '长丰县', '庐江县']}
      // carouselStart={3}
      option={{ geo: { zoom: 1.2, scaleLimit: { min: 1.2, max: 3 } } }}
    />
  ),
  item4: (
    <Gauge
      title="仪表盘"
      style={{ height: '215px' }}
      dataset={[
        { name: '总人次', value: 37 },
        { name: '门诊', value: 12 },
        { name: '住院', value: 88 },
      ]}
    />
  ),
  item5: (
    <Pie
      title="饼图/圆环图"
      dataset={[
        { name: '直接访问', value: 335 },
        { name: '邮件营销', value: 310 },
        { name: '联盟广告', value: 234 },
        { name: '视频广告', value: 135 },
        { name: '搜索引擎', value: 1548 },
      ]}
      // roseType={false}
      radius={['50%', '75%']}
    />
  ),
  // // item6: (
  // //   <Radar
  // //     title="雷达图"
  // //     indicator={[
  // //       { name: 'A', max: 10 },
  // //       { name: 'B', max: 10 },
  // //       { name: 'C', max: 10 },
  // //       { name: 'D', max: 10 },
  // //       { name: 'E', max: 10 },
  // //     ]}
  // //     dataset={[
  // //       { name: '测试1', value: [5, 8, 10, 3, 6] },
  // //       { name: '测试2', value: [2, 4, 4, 8, 9] },
  // //     ]}
  // //     radius={95}
  // //   />
  // // ),
  item6: (
    <Rank
      // title="医疗总费用TOP5"
      // titleStyle={{ textAlign: 'center' }}
      dataset={[
        {
          name: '中国科学技术大学附属第一医院(安徽省立医院)',
          value: 16767.46,
        },
        {
          name: '安徽医科大学第一附属医院',
          value: 11652.37,
        },
        {
          name: '安徽中医药大学第一附属医院',
          value: 6408.0,
        },
        {
          name: '中国人民解放军联勤保障部队第九〇一医院',
          value: 2183.84,
        },
        {
          name: '武警安徽总队医院',
          value: 1445.04,
        },
        {
          name: '中国科学技术大学附属第一医院(安徽省立医院)',
          value: 16767.46,
        },
        {
          name: '安徽医科大学第一附属医院',
          value: 11652.37,
        },
        {
          name: '安徽中医药大学第一附属医院',
          value: 6408.0,
        },
        {
          name: '中国人民解放军联勤保障部队第九〇一医院',
          value: 2183.84,
        },
        {
          name: '武警安徽总队医院',
          value: 1445.04,
        },
        {
          name: '中国科学技术大学附属第一医院(安徽省立医院)',
          value: 16767.46,
        },
        {
          name: '安徽医科大学第一附属医院',
          value: 11652.37,
        },
        {
          name: '安徽中医药大学第一附属医院',
          value: 6408.0,
        },
        {
          name: '中国人民解放军联勤保障部队第九〇一医院',
          value: 2183.84,
        },
        {
          name: '武警安徽总队医院',
          value: 1445.04,
        },
      ]}
      unit="(元)"
      // field={[
      //   ['value', { show: true, alias: '金额', align: 'right' }],
      // ]}
    />
  ),
};
export default DemonLayout;
