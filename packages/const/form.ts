import type { PropType } from 'vue';
import type { FormOption, FormType, modelValue } from '~/types';

export const props = {
  modelValue: {
    type: Object as PropType<{ [key: string]: modelValue }>,
    default: () => ({}),
  },
  option: {
    type: Object as PropType<FormOption<any>>,
  },
  formType: {
    type: String as PropType<FormType>,
    default: 'add',
  },
  defaults: {
    type: Object as PropType<{ [key: string]: modelValue }>,
    default: () => ({}),
  },
  isRequestDic: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
}

export const emits = ['update:modelValue', 'submit', 'empty', 'update:defaults']

export const baseOption: Omit<FormOption<object>, 'column'> = {
  submitBtn: true,
  submitBtnText: '提交',
  emptyBtn: true,
  emptyBtnText: '清空',
  footerBtn: true,
  labelWidth: '100px',
  labelAlign: 'right',
  labelCol: {},
  wrapperCol: {},
  formMarighRight: '40px',
};
