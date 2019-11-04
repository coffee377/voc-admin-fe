import { AnyAction, Reducer } from 'redux';
import { message } from 'antd';
import { Effect, EffectsCommandMap, Model } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';
import themeColorClient from '@/components/SettingDrawer/themeColorClient';

import { getSettings, updateSettings } from '@/services';

/* 数据状态 */
export interface SettingState extends DefaultSettings {}

export interface SettingModelType extends Model {
  state: SettingState;
  reducers: {
    save: Reducer<SettingState>;
    getSetting: Reducer<SettingState>;
    changeSetting: Reducer<SettingState>;
  };
  effects: {
    init: Effect;
  };
}

const updateTheme = (newPrimaryColor?: string) => {
  if (newPrimaryColor) {
    const timeOut = 0;
    const content = formatMessage({ id: 'theme.updating', defaultMessage: '' });
    const hideMessage = message.loading(content, timeOut);
    themeColorClient.changeColor(newPrimaryColor).finally(() => hideMessage());
  }
};

const updateColorWeak: (colorWeak: boolean) => void = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    save: (state: DefaultSettings, { payload }: AnyAction) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {
    *init({ payload }: AnyAction, { put, call }: EffectsCommandMap) {
      /* 1.获取接口数据 */
      const data: defaultSettings = yield call(getSettings, payload);
      /* 2.存储数据到 store */
      yield put({ type: 'save', payload: data });
    },
  },
} as SettingModelType;

export default SettingModel;
