import { CloseOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, Fragment, ref, watch } from 'vue'

import { extractKeyFormObject } from '~/utils/object';
import MDialog from '../dialog';
import styles from './index.module.css'

export default defineComponent({
  name: 'MResizeDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup(props, { attrs, emit, slots }) {
    const dialogRef = ref()
    const { includeRet, excludeRet } = extractKeyFormObject(attrs, 'title');

    const modelValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val)
      },
    })
    const test = ref(true);

    watch(() => props.modelValue, (val) => {
      if (val) {
        test.value = true
      }
    });

    return () => {
      const newSlots = {
        title: () => (
          <Fragment>
            <span>{includeRet.title}</span>
            <span>
              <i
                class={styles.icon}
                onClick={() => {
                  modelValue.value = false;
                }}
              >
                <MinusOutlined />
              </i>
              <i
                class={styles.icon}
                onClick={() => {
                  modelValue.value = false;
                  test.value = false;
                }}
              >
                <CloseOutlined />
              </i>
            </span>
          </Fragment>
        ),
        ...slots,
      };
      return (
        test.value && <MDialog ref={dialogRef} class={styles['m-resize-dialog']} mask={false} keyboard={false} maskClosable={false} isDrag={true} width="400px" height={props.height} {...excludeRet} v-model={modelValue.value} v-slots={newSlots} />
      )
    }
  },
});
