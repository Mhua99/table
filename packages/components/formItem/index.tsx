import { FormItem } from 'ant-design-vue';
import { defineComponent, h } from 'vue'

import { useFormItem } from './useFormItem';

export default defineComponent({
  inheritAttrs: false,
  name: 'MFormItem',
  setup(__, context) {
    return () => {
      const {
        includeRet,
        component,
        compIncludeRet,
        getSlots,
        formItemSlots,
      } = useFormItem(context)
      return (
        <FormItem {...includeRet}>
          {{
            default: () => h(component, { ...compIncludeRet }, getSlots()),
            ...formItemSlots,
          }}
        </FormItem>
      )
    };
  },
})
