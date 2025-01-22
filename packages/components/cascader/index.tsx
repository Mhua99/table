import type { RadioGroup } from 'ant-design-vue';
import type { modelValue } from '~/types'

import { Cascader } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue'

import { commProps } from '~/const/comm';
import { dataTypeTransform } from '~/utils/form'
import { useInjectFormContext } from '../form/useFormContext'

export default defineComponent({
  name: 'MCascader',
  props: commProps,
  emits: [],
  inheritAttrs: false,
  setup(props, { attrs }) {
    // 挂载 ref
    const cascaderRef = ref<typeof RadioGroup>();
    const { dicList, getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();

    const modelValue = computed(({
      get() {
        return dataTypeTransform(getFormData(props.prop) as modelValue, 'array')
      },
      set(val) {
        modifyFormData(props.dataType ? dataTypeTransform(val, props.dataType) : val, props.prop)
      },
    }))

    const dic = computed(() => {
      return dicList.value[props.prop] || []
    });

    collectionAllRefs(props.prop, cascaderRef)

    return () => {
      return (
        <Cascader expandTrigger="hover" {...attrs} ref={cascaderRef} v-model:value={modelValue.value} options={dic.value} />
      )
    };
  },
});
