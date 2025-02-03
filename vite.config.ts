import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteMockServe } from 'vite-plugin-mock';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./packages', import.meta.url)),
    },
  },
  plugins: [
    dts({
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.build.json',
    }),
    vue(),
    vueJsx(),
    Pages({
      dirs: 'src/demo',
    }),
    viteMockServe({
      mockPath: 'api',
    }),
  ],
  build: {
    // 压缩
    lib: {
      entry: 'packages/install.ts',
      name: 'index',
      fileName: format => `index.${format}.js`,
    },
    // minify: true,
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue', 'ant-design-vue', '@ant-design/icons-vue'],
      output: {
        globals: {
          'vue': 'Vue',
          'ant-design-vue': 'antDesignVue',
          '@ant-design/icons-vue': '@ant-design/icons-vue',
        },
      },
    },
  },
});
