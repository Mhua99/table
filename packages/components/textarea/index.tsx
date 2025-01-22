import { Textarea } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue'

import { propProps } from '~/const/comm'
import { useInjectFormContext } from '../form/useFormContext'

export default defineComponent({
  name: 'MTextarea',
  props: propProps,
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    // 挂载 ref
    const textareaRef = ref();
    const { getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();

    const modelValue = computed(({
      get() {
        return getFormData(props.prop)
      },
      set(val) {
        modifyFormData(val, props.prop);
      },
    }))

    collectionAllRefs(props.prop, textareaRef)

    return () => {
      return (
        <Textarea autoSize={{ minRows: 6, maxRows: 6 }} {...attrs} v-model:value={modelValue.value} ref={textareaRef} v-slots={slots}></Textarea>
      )
    }
  },
});
