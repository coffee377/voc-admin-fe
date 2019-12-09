import _ from 'lodash';

type Merge = (...source: object[]) => object;

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
};

export const mixinEnhance: Merge = (...source) => {
  let array: boolean = false;
  source.forEach(value => {
    array = Array.isArray(value);
  });

  if (array) {
    return _.mergeWith([], ...source, customizer);
  }
  return _.mergeWith({}, ...source, customizer);
};

export const mixin: Merge = (...source) => mixinEnhance(...source);
