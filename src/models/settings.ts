import { AnyAction, Reducer } from 'redux';
import { Effect, EffectsCommandMap, Model } from 'dva';
import { getSettings, updateSettings } from '@/services';
import { SettingUp } from '@/models/index';
import defaultSettingUp from '../../config/settingUp';

export interface SettingState extends SettingUp {}

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
  state: defaultSettingUp,
  reducers: {
    save: (state: SettingUp, { payload }: AnyAction) => ({
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
