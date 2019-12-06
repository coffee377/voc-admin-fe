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
   * @description 高度
   * @type {number}
   * @default height = 300
   */
  height?: number;
  /**
   * @description 显示加载动画
   * @type {boolean}
   * @default loading = false
   */
  loading?: boolean;
  /**
   * @description 滚动方向
   * @type {string}
   * @default direction = 'down'
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * @description 滚动量，越大越快
   * @type {number}
   * @default scrollAmount = 0.5
   */
  scrollAmount?: number;
  /**
   * @description 滚动时间间隔，数值越大滚动速度越慢
   * @type {number}
   * @default interval = 20
   */
  interval?: number;
  /**
   * @description 鼠标悬停暂停
   * @type {boolean}
   * @default hoverStop = true
   */
  hoverStop?: boolean;
  /**
   * @description 循环次数，-1 为无限循环
   * @type {number}
   * @default loop = -1
   */
  loop?: number;
  /**
   * @description 内容不足是否滚动
   * @type {boolean}
   * @default runShort = true
   */
  runShort?: boolean;
}

interface ScrollState {
  run: boolean;
  title: HTMLElement;
  container: HTMLElement;
  content: HTMLElement;
}

const Marquee: React.FC<MarqueeProps> = props => {
  const titleRef = useRef<HTMLElement>();
  const containerRef = useRef<HTMLElement>();
  const contentRef = useRef<HTMLElement>();
  const [scroll, setScroll] = useState<ScrollState>({ run: false } as ScrollState);

  // const copyRef = useRef<HTMLElement>();

  const { title, height, style, className } = props;

  // 移动计时器
  let scrollMove;

  // 滚动次数
  let runTimes = 0;

  /**
   * 计算获取内容区高度
   */
  const getContentHeight = () => {
    if (scroll.title) {
      const { clientHeight } = scroll.title;
      if (clientHeight) {
        return height - clientHeight;
      }
    }
    return height;
  };

  // 滚动函数
  const scrollFunc = (props: MarqueeProps) => {
    if (!scroll.run) {
      return;
    }

    const { container, content } = scroll;
    const { direction, scrollAmount, loop } = props;

    switch (direction) {
      case 'down':
        if (container.scrollTop <= 0) {
          container.scrollTop = content.offsetHeight;
          runTimes++;
        } else {
          container.scrollTop -= scrollAmount as number;
        }
        break;
      case 'left':
        if (container.scrollLeft >= content.offsetWidth) {
          container.scrollLeft = 0;
          runTimes++;
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
          runTimes++;
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
    const title = titleRef.current as HTMLElement;
    const container = containerRef.current as HTMLElement;
    const content = contentRef.current as HTMLElement;
    // scroll.run = content.clientHeight - container.clientHeight > 0;
    // scroll.container = container;
    // scroll.content = content;
    // 此方式不能及时拿到 state
    setScroll({
      // 内容长度不足时不滚动
      run: content.clientHeight - container.clientHeight > 0,
      title,
      container,
      content,
    } as ScrollState);
    // setCopy(content.clientHeight - container.clientHeight > 0);
  }, []);

  useEffect(() => {
    if (scroll.run) {
      setScrollMove();
    }
    return () => {
      removeScrollMove();
    };
  }, [props, containerRef.current]);

  return (
    <>
      {title && (
        <div ref={titleRef} className="ui-marquee-title">
          {title}
        </div>
      )}
      <div
        style={{
          height: `${getContentHeight()}px`,
          overflow: 'hidden',
          ...style,
        }}
        className={classNames('ui-marquee-content', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
      >
        <div ref={contentRef} style={{}}>
          {props.children}
        </div>
        {scroll.run && <div>{props.children}</div>}
      </div>
    </>
  );
};

Marquee.defaultProps = {
  title: false,
  height: 300,
  loading: false,
  direction: 'up',
  scrollAmount: 0.5,
  interval: 20,
  hoverStop: true,
  loop: -1,
  runShort: true,
};

export default Marquee;
