import type { FormOption } from '~/types'

import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Button } from 'ant-design-vue';
import { defineComponent, h } from 'vue';

import { emits, props } from '~/const/search';
import Form from '../form'
import { useSearch } from './useSearch';
import './index.scss'

export default defineComponent({
  name: 'MSearch',
  props,
  emits,
  setup(props, context) {
    const { renderFooterBtn, assignOption, defaultsOptions, modelValue, search, empty, formRef, searchCount } = useSearch(props, context)
    return () => {
      return (
        searchCount
          ? (
              <div class="m-search">
                <Form
                  ref={formRef}
                  v-model={modelValue.value}
                  onUpdate:defaults={(val: FormOption<object>) => Object.assign(defaultsOptions.value, val)}
                  defaults={defaultsOptions}
                  option={assignOption.value}
                  isRequestDic={false}
                  v-slots={context.slots}
                >
                </Form>
                <div class="search-btn">
                  {context.slots.leftBtn && context.slots.leftBtn()}
                  <Button icon={h(SearchOutlined)} type="primary" onClick={search}>搜索</Button>
                  <Button icon={h(ReloadOutlined)} onClick={empty}>重置</Button>
                  {context.slots.rightBtn && context.slots.rightBtn()}
                  {
                    renderFooterBtn()
                  }
                </div>
              </div>
            )
          : ''
      )
    };
  },
})
