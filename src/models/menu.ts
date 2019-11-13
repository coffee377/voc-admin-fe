import { MenuDataItem } from '@ant-design/pro-layout';
import { Effect, EffectsCommandMap, Model } from 'dva';
import { AnyAction, Reducer } from 'redux';
import { getMenusByUserId } from '@/services/menu';

type MenuModelState = MenuDataItem[];

export interface MenuModelType extends Model {
  state: MenuModelState;
  reducers: {
    save: Reducer<MenuModelState, AnyAction>;
    clear: Reducer<MenuModelState, AnyAction>;
  };
  effects: {
    getMenusByUserId: Effect;
    get: Effect;
    post: Effect;
    put: Effect;
    delete: Effect;
  };
}

const MenuModel: MenuModelType = {
  state: [],
  reducers: {
    save: (state: MenuModelState, { payload }: AnyAction) => [...payload],
  },
  effects: {
    *getMenusByUserId({ payload }: AnyAction, { call, put }: EffectsCommandMap) {
      /* 1.获取接口数据 */
      const { uid, token } = payload;
      const data = yield call(getMenusByUserId, uid, token);
      /* 2.存储数据到 store */
      yield put({ type: 'save', payload: data || [] });
    },
  },
} as MenuModelType;

export default MenuModel;
