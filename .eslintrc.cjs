module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential', // 注意这里是推荐用这个的，不推荐plugin:vue/essential
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser', // 解决 Parsing error: Unexpected token
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint' // 解决 Parsing error: Unexpected token
  ],
  rules: {
    'space-before-function-paren': 0,
    // 解决 Component name "index" should always be multi-word.
    // 在rules中添加自定义规则
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off'
  }
}
