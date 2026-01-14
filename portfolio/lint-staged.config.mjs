// lint-staged.config.mjs
const config = {
  // Cek Eslint pada file yang berubah saja
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  
  // Cek TypeScript (Type-Check) pada SELURUH project
  // Kita gunakan fungsi () => ... untuk mengabaikan nama file yang dikirim lint-staged
  // agar tsc tidak error karena menerima argumen file.
  '*.{ts,tsx}': () => 'npm run type-check',
};

export default config;