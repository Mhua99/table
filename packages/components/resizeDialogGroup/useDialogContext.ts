import type { ExtractPropTypes, InjectionKey } from 'vue';
import type { props as formProps } from '~/const/resizeDialog'
import type { AttrsType } from '~/types'

import { inject, provide, reactive } from 'vue';

export interface DialogContext {
  dialogList: DialogList[]
  collectionVisible: (val: boolean, prop: string) => void
  getData: (uniqueKey: string) => boolean
  which: (uniqueKey: string, val: boolean, isDeepHide: boolean, attrs: any) => void
  collectionDialogList: (uniqueKey: string, hide: boolean, domHide: boolean, attrs: any) => void
}

const defaultModifyFormData = {
  collectionVisible: () => { },
  getData: () => true,
  which: (uniqueKey: string, val: boolean, isDeepHide: boolean, attrs: any) => { },
  collectionDialogList: (uniqueKey: string, hide: boolean, domHide: boolean, attrs: any) => {},
  dialogList: [],
};

const ContextKey: InjectionKey<DialogContext> = Symbol('DialogContext');

interface DialogList {
  uniqueKey: string
  visible: boolean
  domVisible: boolean
  attrs: AttrsType
  zIndex: number
}

export function useProvideDialogContext(emit: any, props: ExtractPropTypes<typeof formProps>) {
  /** 窗口数据 */
  const dialogList = reactive<DialogList[]>([])

  /** 收集弹窗的窗口数据 */
  function collectionDialogList(uniqueKey: string, visible: boolean, domVisible: boolean, attrs: any) {
    const index = dialogList.findIndex(item => item.uniqueKey === uniqueKey);
    if (index === -1) {
      dialogList.push({ uniqueKey, domVisible: false, visible: false, attrs, zIndex: 998 });
    }
    else {
      const row = dialogList[index]
      dialogList[index] = { ...row, domVisible, visible, attrs }
    }

    if (visible) {
      dialogList.forEach(item => item.zIndex = 998);
      const index = dialogList.findIndex(item => item.uniqueKey === uniqueKey);
      index > 0 && (dialogList[index].zIndex = 999)
    }
  }

  /** 收集 v-model 数据 */
  function collectionVisible(val: boolean, field: string) {
    const form = props.modelValue;
    form[field] = val;
    emit('update:modelValue', form);
  }

  /** 窗口显影触发数据 */
  function which(uniqueKey: string, visible: boolean, domVisible: boolean, attrs: any) {
    collectionDialogList(uniqueKey, visible, domVisible, attrs);
    emit('which', uniqueKey, visible, domVisible, props.modelValue)
  }

  function getData(uniqueKey: string) {
    return props.modelValue[uniqueKey]
  }

  provide(ContextKey, {
    collectionVisible,
    getData,
    which,
    collectionDialogList,
    dialogList,
  })

  return {
    dialogList,
  };
}

export function useInjectDialogContext() {
  return inject(ContextKey, defaultModifyFormData)
}
