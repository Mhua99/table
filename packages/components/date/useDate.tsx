import type { Component, ComputedRef, ExtractPropTypes, Ref, SetupContext } from 'vue'
import type { props as dateProps } from '~/const/date';
import type { CommObj } from '~/types';

import { DatePicker, RangePicker } from 'ant-design-vue'
import { computed, ref } from 'vue'

import { excludeAttrs } from '~/const/comm';
import { dataTypeTransform } from '~/utils/form'
import { extractKeyFormObject } from '~/utils/object'
import { useInjectFormContext } from '../form/useFormContext'

interface UseDateReturn {
  includeRet: CommObj
  modelValue: ComputedRef<any>
  dateObj: CommObj
  dateRef: Ref<InstanceType<typeof DatePicker> | InstanceType<typeof RangePicker> | undefined>
  comp: Component
  change: (val: string) => void
}

export function useDate(props: ExtractPropTypes<typeof dateProps>, attrs: SetupContext['attrs']): UseDateReturn {
  // 挂载 ref
  const dateRef = ref<InstanceType<typeof DatePicker> | InstanceType<typeof RangePicker> | undefined>();
  const { excludeRet: includeRet } = extractKeyFormObject(attrs, excludeAttrs);
  const { getFormData, modifyFormData, collectionAllRefs } = useInjectFormContext();
  let comp: Component = DatePicker;

  const modelValue = computed(() => {
    const val = getFormData(props.prop)
    if (props.range && !Array.isArray(val)) {
      return String(val)?.split(',') || []
    }
    else {
      return val;
    }
  });

  collectionAllRefs(props.prop, dateRef);

  function change(val: string) {
    if (props.dataType) {
      modifyFormData(dataTypeTransform(val, props.dataType), props.prop);
    }
    else {
      modifyFormData(val, props.prop)
    }
  }

  const dateObj: CommObj = {
    picker: 'date',
    style: {
      width: '100%',
    },
  }

  switch (props.type) {
    case 'date':
      dateObj.picker = 'date'
      dateObj.format = 'YYYY-MM-DD'
      dateObj.valueFormat = 'YYYY-MM-DD'
      break
    case 'datetime':
      dateObj.showTime = true;
      dateObj.format = 'YYYY-MM-DD HH:mm'
      dateObj.valueFormat = 'YYYY-MM-DD HH:mm:ss'
      break
    case 'time':
      dateObj.picker = 'time'
      dateObj.format = 'HH:mm'
      dateObj.valueFormat = 'HH:mm:ss'
      break
    case 'month':
      dateObj.picker = 'month'
      dateObj.format = 'YYYY-MM'
      dateObj.valueFormat = 'YYYY-MM'
      break
    case 'week':
      dateObj.picker = 'week'
      // dateObj.format = "YYYY-MM-DD";
      dateObj.valueFormat = 'YYYY-MM-DD'
      break
  }

  if (props.range) {
    comp = RangePicker
  }

  return {
    includeRet,
    modelValue,
    dateObj,
    dateRef,
    change,
    comp,
  };
}
