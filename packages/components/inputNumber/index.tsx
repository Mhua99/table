import { InputNumber } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue'

import { propProps } from '~/const/comm'
import { useInjectFormContext } from '../form/useFormContext'

export default defineComponent({
  name: 'MInputNumber',
  props: propProps,
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    // 挂载 ref
    const inputNumberRef = ref();

    const { getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();

    const modelValue = computed(({
      get() {
        return getFormData(props.prop)
      },
      set(val) {
        modifyFormData(val, props.prop);
      },
    }))

    collectionAllRefs(props.prop, inputNumberRef)

    return () => {
      return (
        <InputNumber {...attrs} style={{ width: '100%' }} v-model:value={modelValue.value} ref={inputNumberRef} v-slots={slots}></InputNumber>
      )
    }
  },
});
