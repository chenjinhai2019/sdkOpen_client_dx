// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 0,
    'import/no-dynamic-require':0 ,
    'no-trailing-spaces': 0,
    'linebreak-style': 0,
    'semi': 0,
    'max-len': 0,
    'no-console':0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    'no-new': 0,
    'comma-dangle': 0,
    'no-plusplus': 0,
    'consistent-return':0,
    'prefer-const': 0,
    'no-param-reassign': 0,
    'no-else-return': 0,
    'dot-notation': 0,
    'arrow-body-style': 0,  //该规则可以强制或禁止在箭头函数体的周围使用大括号。
    'no-underscore-dangle': 0, //此规则不允许在标识符中使用悬空下划线 _this
    'no-lonely-if': 0, // else里不能只有一个if
  }
}
