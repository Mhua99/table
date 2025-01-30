import { defineComponent } from 'vue';

import { useProvideDialogContext } from './useDialogContext';

export default defineComponent({
  name: 'MResizeDialogGroup',
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'which'],
  inheritAttrs: false,
  setup(props, { emit, slots }) {
    const { dialogList } = useProvideDialogContext(emit, props)

    return () => {
      return (
        <div>
          {slots.default && slots.default()}
          {slots.list && slots.list(dialogList) }
        </div>
      )
    }
  },
});
