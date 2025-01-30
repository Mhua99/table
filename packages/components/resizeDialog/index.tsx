import { CloseOutlined, MinusOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent, Fragment, ref, watch } from 'vue'

import { extractKeyFormObject } from '~/utils/object';
import MDialog from '../dialog';
import { useInjectDialogContext } from '../resizeDialogGroup/useDialogContext'
import styles from './index.module.css';

export default defineComponent({
  name: 'MResizeDialog',
  props: {
    modelValue: {
      type: Boolean,
    },
    height: {
      type: String,
      default: '300px',
    },
    uniqueKey: {
      type: String,
    },
    beforeClose: {
      type: Function,
    },
  },
  emits: ['update:modelValue'],
  inheritAttrs: false,
  setup(props, { attrs, emit, slots }) {
    const { includeRet, excludeRet } = extractKeyFormObject(attrs, 'title');
    const { collectionVisible, getData, which, collectionDialogList, dialogList } = useInjectDialogContext();

    if (props.uniqueKey) {
      collectionVisible(false, props.uniqueKey);
      collectionDialogList(props.uniqueKey, false, false, attrs)
    }

    const modelValue = computed({
      get() {
        return props.modelValue || getData(props.uniqueKey!);
      },
      set(val) {
        if (props.uniqueKey)
          collectionVisible(val, props.uniqueKey);
        else
          emit('update:modelValue', val)
      },
    })

    const domVisible = ref(false);

    function whichEmit() {
      if (!props.uniqueKey)
        return;

      which(props.uniqueKey, modelValue.value, domVisible.value, attrs)
    }

    watch(() => modelValue.value, (val) => {
      if (val && !domVisible.value) {
        domVisible.value = true
      }

      val && whichEmit()
    });

    /** 把元素从dom中移除 */
    function deepHideEvent() {
      function done() {
        modelValue.value = false;
        setTimeout(() => {
          domVisible.value = false;
          whichEmit()
        }, 100);
      }

      if (props.beforeClose) {
        props.beforeClose?.(done)
      }
      else {
        done();
      }
    }

    function hideEvent() {
      modelValue.value = false;
      whichEmit()
    }

    function handleClick() {
      dialogList.forEach(item => item.zIndex = 998);
      const index = dialogList.findIndex(item => item.uniqueKey === props.uniqueKey);
      if (index > -1) {
        dialogList[index].zIndex = 999
      }
    }

    return () => {
      const newSlots = {
        title: () => (
          <Fragment>
            <span>{includeRet.title}</span>
            <span>
              <i
                class={styles.icon}
                onClick={hideEvent}
              >
                <MinusOutlined />
              </i>
              <i
                class={styles.icon}
                onClick={deepHideEvent}
              >
                <CloseOutlined />
              </i>
            </span>
          </Fragment>
        ),
        ...slots,
      };
      const row = dialogList.find(item => item.uniqueKey === props.uniqueKey) || { zIndex: 999 };
      return (
        domVisible.value && <MDialog zIndex={row.zIndex} closable={false} class={styles['m-resize-dialog']} mask={false} keyboard={false} maskClosable={false} isDrag={true} width="400px" height={props.height} {...excludeRet} onClick={handleClick} v-model={modelValue.value} v-slots={newSlots} />
      )
    }
  },
});
