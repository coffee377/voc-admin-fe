import _ from 'lodash';

type Merge = (...source: object[]) => object;

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

export const mixin: Merge = (...source: object[]) => {
  return _.mergeWith({}, ...source, customizer);
};
