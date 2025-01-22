import type { DicData } from '~/types'

import { Checkbox, CheckboxGroup } from 'ant-design-vue'
import { computed, defineComponent, ref } from 'vue'

import { commProps } from '~/const/comm'
import { dataTypeTransform } from '~/utils/form'
import { useInjectFormContext } from '../form/useFormContext'

export default defineComponent({
  name: 'MCheckbox',
  props: commProps,
  emits: [],
  inheritAttrs: false,
  setup(props, { attrs }) {
    // 挂载 ref
    const checkboxRef = ref<typeof CheckboxGroup>();
    const { dicList, getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();

    const modelValue = computed(({
      get() {
        const val = getFormData(props.prop)
        if (!Array.isArray(val)) {
          return String(val)?.split(',') || []
        }
        else {
          return val;
        }
      },
      set(val) {
        props.dataType ? modifyFormData(dataTypeTransform(val, props.dataType), props.prop) : modifyFormData(val, props.prop)
      },
    }))

    const dic = computed<DicData[]>(() => {
      return dicList.value[props.prop]?.map(item => ({ ...item, value: String(item.value) })) || []
    });

    collectionAllRefs(props.prop, checkboxRef)

    return () => {
      return (
        <CheckboxGroup {...attrs} ref={checkboxRef} v-model:value={modelValue.value}>
          {
            dic.value.map(item => <Checkbox {...attrs} value={item.value} key={item.value}>{item.label}</Checkbox>)
          }
        </CheckboxGroup>
      )
    };
  },
});
