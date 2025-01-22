import type { DicData } from '~/types';

import { Select, SelectOption } from 'ant-design-vue'
import { computed, defineComponent, ref } from 'vue'

import { allExcludeAttrs, commProps } from '~/const/comm'
import { dataTypeTransform } from '~/utils/form'
import { extractKeyFormObject } from '~/utils/object'
import { useInjectFormContext } from '../form/useFormContext'

export default defineComponent({
  name: 'MSelect',
  props: commProps,
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup(props, { attrs }) {
    // 挂载 ref
    const selectRef = ref();

    const { dicList, getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();
    const { excludeRet: includeRet } = extractKeyFormObject(attrs, allExcludeAttrs);

    const dic = computed<DicData[]>(() => {
      return dicList.value[props.prop]
    });

    collectionAllRefs(props.prop, selectRef)

    const modelValue = computed({
      get() {
        return getFormData?.(props.prop)
      },
      set(val) {
        modifyFormData(props.dataType ? dataTypeTransform(val, props.dataType) : val, props.prop)
      },
    })

    return () => {
      return (
        <Select allowClear={true} {...includeRet} ref={selectRef} v-model:value={modelValue.value}>
          {
            dic.value?.map(item => <SelectOption value={item.value}>{item.label}</SelectOption>)
          }
        </Select>
      )
    };
  },
});
