import { AnyAction, Reducer } from 'redux';
import { Effect, EffectsCommandMap, Model } from 'dva';
import { Settings } from '@ant-design/pro-layout';
import { getSettings, updateSettings } from '@/services';
import defaultSetting from '../../config/defaultSetting';
import { VocConfig } from '@/typings';

export type SettingState = Partial<Settings> & Partial<VocConfig>;

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
