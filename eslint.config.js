import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,

  ignores: [
    'node_modules/**',
    'dist/**',
    '*.md',
    '*.yaml',
  ],
  rules: {
    'no-console': 'off', // 允许console
    'ts/ban-ts-comment': 'off', // 允许忽略类型检查
    'unused-imports/no-unused-imports': 'error', // 不允许未使用的导入
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'], // 类型导入放在顶层
    'unused-imports/no-unused-vars': 'off',
    'import/order': [
      'error',
      {
        'groups': ['type', 'builtin', 'external', 'internal'],
        'newlines-between': 'always',
      },
    ],
    'n/prefer-global/process': 'off',
    'semi': [2, 'always'], // 语句强制分号结尾
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
})
