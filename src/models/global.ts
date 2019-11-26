import { Model } from 'dva';

export interface GlobalModelState {}

export interface GlobalModelType extends Model {
  state: GlobalModelState;
  reducers: {};
}

const GlobalModel: GlobalModelType = {
  namespace: 'global.less',
  state: {},
  reducers: {},
};

export default GlobalModel;
