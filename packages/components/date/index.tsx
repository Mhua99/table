import type { CommObj } from '~/types';

import { defineComponent, h } from 'vue';

import { props } from '~/const/date';
import { useDate } from './useDate';

export default defineComponent({
  name: 'MDate',
  props,
  emits: [],
  inheritAttrs: false,
  setup(props, { attrs }) {
    const {
      comp,
      includeRet,
      modelValue,
      dateObj,
      dateRef,
      change,
    } = useDate(props, attrs as CommObj)

    return () => h(comp, { ...dateObj, ...includeRet, ref: dateRef, value: modelValue.value, onChange: change })
  },
});
