import Table from '@mhua/table';
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import theme from 'vitepress/dist/client/theme-default/index.js';
import '@vitepress-demo-preview/component/dist/style.css';
import 'ant-design-vue/dist/reset.css';
import "@mhua/table/dist/table.css"
import "../styles/index.css"

export default {
  ...theme,
  enhanceApp({ app }) {
    app.use(Table);
    app.component('demo-preview', AntDesignContainer)
  },
};
