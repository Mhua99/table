import type { ComponentInstance } from 'vue';

import { Input, InputPassword } from 'ant-design-vue';
import { computed, defineComponent, Fragment, ref } from 'vue'

import { allExcludeAttrs, propProps, typeProps } from '~/const/comm'
import { extractKeyFormObject } from '~/utils/object'
import { useInjectFormContext } from '../form/useFormContext'

export default defineComponent({
  name: 'MInput',
  props: {
    ...propProps,
    ...typeProps,
  },
  emits: [],
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    // 挂载 ref
    const inputRef = ref<ComponentInstance<typeof Input>>();
    const { getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();
    const { excludeRet: includeRet } = extractKeyFormObject(attrs, allExcludeAttrs);

    const modelValue = computed(({
      get() {
        return getFormData(props.prop)
      },
      set(val) {
        modifyFormData(val, props.prop);
      },
    }))

    collectionAllRefs(props.prop, inputRef)

    return () => {
      return (
        <Fragment>
          {
            props.type === 'password' ? <InputPassword {...includeRet} v-model:value={modelValue.value} ref={inputRef} v-slots={slots} /> : <Input {...includeRet} v-model:value={modelValue.value} ref={inputRef} v-slots={slots}></Input>
          }
        </Fragment>
      )
    }
  },
});
