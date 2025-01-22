import type { PropType } from 'vue'
import type { CommObj, modelValue, TableOption } from '~/types'

export const excludeRetField = ['span', 'labelWidth', 'rules', 'value', 'display', 'disabled', 'range']

export const props = {
  /** 表单数据 */
  modelValue: {
    type: Object as PropType<{ [key: string]: modelValue }>,
    default: () => ({}),
  },
  /** 配置项 */
  option: {
    type: Object as PropType<TableOption<CommObj>>,
  },
  emitsEvent: {
    type: Function as PropType<any>,
  },
};

export const emits = ['update:modelValue', 'submit', 'empty']
