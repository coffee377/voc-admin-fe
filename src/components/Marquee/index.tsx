import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { StyleProps, WithFalse } from '@/typings';

/**
 * @see http://www.dowebok.com/188.html
 */
export interface MarqueeProps extends StyleProps {
  /**
   * @description 标题
   * @type {WithFalse<React.ReactNode>}
   * @default title = false
   */
  title?: WithFalse<React.ReactNode>;
  /**
   * @description 显示加载动画
   * @type {boolean}
   * @default loading = false
   */
  loading?: boolean;
  /**
   * @description 主题
   * @type {object|string}
   * @default theme = null
   */
  theme?: object | string;
  /**
   * @description 滚动方向
   * @type {string}
   * @default direction = 'down'
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * @description 循环次数，-1 为无限循环
   * @type {number}
   * @default loop = -1
   */
  loop?: number;
  /**
   * @description 每次重复之前的延迟
   * @type {number}
   * @default scrollDelay = 0
   */
  scrollDelay?: number;
  /**
   * @description 滚动量，越大越快
   * @type {number}
   * @default scrollAmount = 1
   */
  scrollAmount?: number;
  /**
   * @description 滚动时间间隔，数值越大滚动速度越慢
   * @type {number}
   * @default interval = 50
   */
  interval?: number;
  /**
   * @description 无缝滚动
   * @type {boolean}
   * @default circular = true
   */
  circular?: boolean;
  /**
   * @description 鼠标可拖动
   * @type {boolean}
   * @default drag = true
   */
  drag?: boolean;
  /**
   * @description 内容不足是否滚动
   * @type {boolean}
   * @default runShort = true
   */
  runShort?: boolean;
  /**
   * @description 鼠标悬停暂停
   * @type {boolean}
   * @default hoverStop = true
   */
  hoverStop?: boolean;
  /**
   * @description 反向，即默认不滚动，鼠标悬停滚动
   * @type {boolean}
   * @default invertHover = false
   */
  invertHover?: boolean;
}

const Marquee: React.FC<MarqueeProps> = props => {
  const [copyContent, setCopy] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>();
  const contentRef = useRef<HTMLElement>();
  const copyRef = useRef<HTMLElement>();

  const { title, style, className } = props;

  // 移动计时器
  let scrollMove; // 数值越大，滚动速度越慢
  // let copy: boolean = false;
  // 滚动函数
  const scrollFunc = (props: MarqueeProps) => {
    // console.log(props);
    const container = containerRef.current as HTMLElement;
    const content = contentRef.current as HTMLElement;
    // copy = content.clientHeight > container.clientHeight;
    // console.log(`------------${copy}`);
    // if (!copy) {
    //   return;
    // }
    // console.log(container.clientHeight, content.clientHeight);
    // const copy = copyRef.current as HTMLElement;
    const { direction, scrollAmount } = props;

    switch (direction) {
      case 'down':
        if (container.scrollTop <= 0) {
          container.scrollTop = content.offsetHeight;
        } else {
          container.scrollTop -= scrollAmount as number;
        }
        break;
      case 'left':
        if (container.scrollLeft >= content.offsetWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollAmount as number;
        }
        break;
      case 'right':
        break;
      case 'up':
      default:
        if (container.scrollTop >= content.offsetHeight) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += scrollAmount as number;
        }
    }
  };

  const setScrollMove = () => {
    scrollMove = setInterval(scrollFunc, props.interval as number, props);
  };

  const removeScrollMove = () => {
    clearInterval(scrollMove);
  };

  const handleMouseEnter = () => {
    if (props.hoverStop) {
      removeScrollMove();
    }
  };

  const handleMouseLeave = () => {
    if (props.hoverStop) {
      setScrollMove();
    }
  };

  useEffect(() => {
    const c = containerRef.current as HTMLElement;
    const c1 = contentRef.current as HTMLElement;
    setCopy(c1.clientHeight - c.clientHeight > 0);
  }, []);

  useEffect(() => {
    setScrollMove();
    return () => {
      removeScrollMove();
    };
  }, [props, containerRef.current]);

  return (
    <>
      {title && <div className="ui-marquee-title">{title}</div>}
      <div
        style={{ height: '300px', overflow: 'hidden', ...style }}
        className={classNames('ui-marquee-content', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <div ref={contentRef} style={{}}>
          {props.children}
        </div>
        {copyContent && (
          <div ref={copyRef} style={{}}>
            {props.children}
          </div>
        )}
      </div>
    </>
  );
};

Marquee.defaultProps = {
  title: false,
  loading: false,
  theme: null,
  direction: 'up',
  loop: -1,
  scrollDelay: 0,
  scrollAmount: 1,
  interval: 50,
  circular: true,
  drag: true,
  runShort: true,
  hoverStop: true,
  invertHover: false,
};

export default Marquee;
