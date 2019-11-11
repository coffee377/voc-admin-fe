import { AnyAction, Reducer } from 'redux';
import { Effect, EffectsCommandMap, Model } from 'dva';
import { Settings } from '@ant-design/pro-layout';
import { WithFalse } from '@ant-design/pro-layout/lib/typings';
import { getSettings, updateSettings } from '@/services';
import defaultSetting from '../../config/defaultSetting';
import Link from '@/components/Link';
import { VocConfig } from '@/typings';

// export interface SettingState extends Settings {
//   /**
//    * 菜单栏是否折叠
//    */
//   collapsed?: boolean;
//   /**
//    * 配置站点名称，应用到登录框，侧边栏顶部的标题文字显示，优先级高于 title
//    */
//   siteName?: string;
//   /**
//    * 超链接
//    */
//   links?: WithFalse<Link[]>;
//   /**
//    * 配置版权声明
//    */
//   copyright?: string;
//   /**
//    * 配置站点 Logo
//    */
//   logoPath?: string;
//   /**
//    * 配置项目中接口的前缀
//    */
//   apiPrefix?: string;
// }

export type SettingState = Partial<Settings> & Partial<VocConfig>

export interface SettingModelType extends Model {
  state: SettingState;
  reducers: {
    save: Reducer<SettingState, AnyAction>;
  };
  effects: {
    init: Effect;
    updateSetting: Effect;
  };
}

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSetting,
  reducers: {
    save: (state: SettingState, { payload }: AnyAction) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *init({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      /* 1.获取接口数据 */
      const data: SettingState = yield call(getSettings, payload);
      /* 2.存储数据到 store */
      yield put({ type: 'save', payload: data });
    },
    *update({ payload }: AnyAction, { call, select }: EffectsCommandMap) {
      /* 1.获取命名空间 state 数据 */
      const settingState: SettingState = yield select(
        ({ settings }: { settings: SettingState }) => settings,
      );
      /* 2.更新服务器数据 */
      yield call(updateSettings, settingState);
    },
  },
} as SettingModelType;

export default SettingModel;
