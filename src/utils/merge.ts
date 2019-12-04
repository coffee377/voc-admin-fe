import _ from 'lodash';

type Merge = (...source: object[]) => object;

// eslint-disable-next-line consistent-return
const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const mixin: Merge = (...source: object[]) => _.mergeWith({}, ...source, customizer);
