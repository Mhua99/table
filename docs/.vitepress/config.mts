import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/table/',
  title: '@mhua/table的文档网站',
  description: '一个基于ant-design-vue封装的 vue3 表格组件',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      // { text: '例子', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: 'table', link: '/markdown-examples' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mhua99/table' },
    ],
    aside: false,
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview)
      md.use(containerPreview)
    },
  },
});
