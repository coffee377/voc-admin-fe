import { Model } from 'dva';

export interface GlobalModelState {}

export interface GlobalModelType extends Model {
  state: GlobalModelState;
  reducers: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {},
  reducers: {},
};

export default GlobalModel;
