import type { DicData } from '~/types'

import { Radio, RadioGroup } from 'ant-design-vue'
import { computed, defineComponent, ref } from 'vue'

import { commProps } from '~/const/comm';
import { dataTypeTransform } from '~/utils/form';
import { useInjectFormContext } from '../form/useFormContext';

export default defineComponent({
  name: 'MRadio',
  props: commProps,
  emits: [],
  inheritAttrs: false,
  setup(props) {
    // 挂载 ref
    const radioRef = ref<typeof RadioGroup>();
    const { dicList, getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();

    const modelValue = computed(({
      get() {
        return getFormData(props.prop)
      },
      set(val) {
        modifyFormData(props.dataType ? dataTypeTransform(val, props.dataType) : val, props.prop)
      },
    }))

    const dic = computed<DicData[]>(() => {
      return dicList.value[props.prop] || []
    });

    collectionAllRefs(props.prop, radioRef)

    return () => {
      return (
        <RadioGroup ref={radioRef} v-model:value={modelValue.value}>
          {
            dic.value.map(item => <Radio value={item.value} key={item.value}>{item.label}</Radio>)
          }
        </RadioGroup>
      )
    };
  },
});
