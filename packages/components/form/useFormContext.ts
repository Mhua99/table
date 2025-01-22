import type { ExtractPropTypes, InjectionKey, Ref, SetupContext } from 'vue';
import type { emits as formEmits, props as formProps } from '~/const/form'
import type { DicData, modelValue } from '~/types'

import { inject, provide, ref } from 'vue';

export interface FormContext {
  modifyFormData: (val: modelValue, prop: string) => void
  dicList: Ref<Record<string, DicData[]>>
  getFormData: (field: string) => modelValue
  collectionAllRefs: (prop: string, htmlResult: Ref<any>) => void
}

const defaultModifyFormData = {
  modifyFormData: () => { },
  dicList: ref({}),
  getFormData: () => true,
  collectionAllRefs: () => { },
};

const ContextKey: InjectionKey<FormContext> = Symbol('FormContext');

export function useProvideFormContext(emit: SetupContext<typeof formEmits>['emit'], props: ExtractPropTypes<typeof formProps>) {
  const dicList = ref<Record<string, DicData[]>>({})
  const allRefs: Record<string, Ref<any>> = {}

  function modifyFormData(val: modelValue, prop: string) {
    const form = props.modelValue;
    form[prop] = val;
    emit('update:modelValue', form);
  }

  function getFormData(field: string) {
    return props.modelValue[field]
  }

  function collectionAllRefs(prop: string, htmlResult: Ref<any>) {
    allRefs[prop] = htmlResult
  }

  provide(ContextKey, {
    modifyFormData,
    dicList,
    getFormData,
    collectionAllRefs,
  })

  return {
    dicList,
    allRefs,
  }
}

export function useInjectFormContext() {
  return inject(ContextKey, defaultModifyFormData)
}
