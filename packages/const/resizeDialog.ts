import type { PropType } from 'vue'

export const props = {
  /** 弹窗显示和隐藏 */
  modelValue: {
    type: Object as PropType<Record<string, boolean>>,
    default: () => ({}),
  },
}

export const emits = ['update:modelValue'];
