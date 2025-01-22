import dayjs from 'dayjs';
import { createApp } from 'vue'

import Table from '~/install'
import App from './App.vue'
import router from './router/index'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

Table.collection({
  hookUseTableSettings: {
    resFormatter(res) {
      return res.data
    },
    totalFormatter(res) {
      return res.total
    },
  },
})

createApp(App).use(router).mount('#app')
