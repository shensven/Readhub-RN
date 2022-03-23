module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-inline-styles': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
