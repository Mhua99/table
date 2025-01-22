import type { FormInstance } from 'ant-design-vue'
import type { ExtractPropTypes, SetupContext, Slot, Slots } from 'vue'
import type { emits as formEmits, props as formProps } from '~/const/form';
import type { Column, modelValue, Rule } from '~/types'

import { Button } from 'ant-design-vue'
import { computed, reactive, ref, watch } from 'vue';

import { baseOption } from '~/const/form';
import { baseColumn } from '~/const/formItem'
import { settings } from '~/utils/collect'
import { requestFun } from '~/utils/fetch';
import { flagTree, getDisabled, getDisplay, getPlaceholder } from '~/utils/form'
import styles from './index.module.css';
import { useProvideFormContext } from './useFormContext'

export function useForm(props: ExtractPropTypes<typeof formProps>, { slots, emit, expose }: SetupContext<typeof formEmits>) {
  const { dicList, allRefs } = useProvideFormContext(emit, props);
  const formRef = ref<FormInstance>();

  const initForm: { [key: string]: modelValue } = { };

  function setDic(item: Column<typeof props.modelValue>) {
    if (['select', 'radio', 'checkbox', 'cascader'].includes(item.type!)) {
      if (item.dicData && !dicList.value[item.prop]) {
        dicList.value[item.prop] = item.dicData || []
      }
      else if (item.dicUrl && props.isRequestDic) {
        requestFun(item.dicUrl).then((res) => {
          dicList.value[item.prop] = flagTree(item.dicFormatter?.(res) || [], item)
        });
      }
    }
  }

  // 默认配置项
  const rules: { [key: string]: Rule[] } = {};
  const assignOption = reactive({
    column: [],
    ...baseOption,
    ...props.option,
  })
  assignOption.column = (props?.option?.column as Column<typeof props.modelValue>[]).map((item: Column<typeof props.modelValue>) => {
    const newItem: Column<typeof props.modelValue> & { slots?: Slots } = {
      labelWidth: assignOption.labelWidth,
      ...baseColumn,
      ...settings.column,
      ...item,
    }
    newItem.disabled = getDisabled(newItem, props.formType);
    newItem.placeholder = getPlaceholder(newItem);
    newItem.display = getDisplay(newItem as Column<object>, props.formType);
    item.rules && (rules[item.prop] = item.rules);
    newItem.name = newItem.prop;
    newItem.slots = getSlots(newItem.prop as string)
    newItem.originItem = { ...baseColumn, ...item };
    initForm[newItem.name] = item.value
    setDic(newItem)
    return newItem;
  })

  const column = computed(() => {
    return (props?.option?.column as Column<object>[]).map((item: Column<object>) => {
      // @ts-ignore
      const newItem: Column<object> & { slots?: Slots } = {
        labelWidth: assignOption.labelWidth,
        ...baseColumn,
        ...settings.column,
        ...item,
      } 
      return newItem;
    })
  });

  function formTypeWatchCallback() {
    assignOption.column.forEach((item) => {
      const row = column.value?.find(col => col.prop === item.prop);
      if (row) {
        item.disabled = getDisabled(row, props.formType);
        item.display = getDisplay(row, props.formType);
        setDic(item as Column<typeof props.modelValue>)
      }
    })
  }

  watch(() => [props.formType, props.option], formTypeWatchCallback, { deep: true })

  emit('update:modelValue', Object.assign({}, initForm, props.modelValue))
  emit('update:defaults', assignOption)

  function getSlots(prop: string) {
    const ret = {} as Record<string, Slot>;
    Object.keys(slots).forEach((item) => {
      if (item.startsWith(prop)) {
        ret[item === prop ? 'default' : item] = slots[item] as Slot;
      }
    });
    return ret;
  }

  function renderFooterBtn() {
    return (
      assignOption.footerBtn && (
        <div class={styles['m-form-btn']}>
          {
            [
              assignOption.submitBtn && <Button onClick={submit} type="primary">{assignOption.submitBtnText}</Button>,
              assignOption.emptyBtn && <Button onClick={empty}>{assignOption.emptyBtnText}</Button>,
              slots.footer && slots.footer(),
            ]
          }
        </div>
      )
    )
  }

  async function validate(cb: (...args: any) => void) {
    try {
      const result = await formRef.value?.validate();
      cb(true, result);
    }
    catch (error) {
      cb(false, error);
    }
  }

  function submit() {
    validate((res) => {
      emit('submit', res)
    });
  }

  function resetFields() {
    formRef.value?.resetFields();
  }

  function empty() {
    formRef.value?.resetFields();
    emit('empty')
  }

  expose({
    validate,
    submit,
    empty,
    dicList,
    allRefs,
    formRef,
    assignOption,
    resetFields,
    initForm,
  })

  return {
    formRef,
    assignOption,
    rules,
    renderFooterBtn,
  };
}
