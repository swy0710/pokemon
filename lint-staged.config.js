export default {
  'src/**/*.{ts,tsx}': [
    'eslint --fix',
    () => 'tsc -p tsconfig.app.json --noEmit',
  ],
};
