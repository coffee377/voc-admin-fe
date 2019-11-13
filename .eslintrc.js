const { strictEslint } = require('@umijs/fabric');

// import { strictEslint } from '@umijs/fabric';

module.exports = {
  ...strictEslint,
  // globals: {
  //   ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
  //   page: true,
  // },
  rules: {
    ...strictEslint.rules,
    'max-len': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'react/no-array-index-key': 1,
    'no-plusplus': 0,
    'no-console': 0,
    'no-shadow': 0,
  },
};
// import { strictEslint } from "@umijs/fabric";
//
// module.exports = strictEslint;
