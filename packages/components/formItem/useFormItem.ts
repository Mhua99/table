import type { Component, SetupContext, Slot } from 'vue'

import { excludeAttrs } from '~/const/comm';
import { formItemAttrs } from '~/const/formItem'
import { mapComponent } from '~/const/mapComponent';
import { extractKeyFormObject } from '~/utils/object'

export function useFormItem({ attrs, slots }: SetupContext) {
  const { includeRet, excludeRet } = extractKeyFormObject(attrs, formItemAttrs);
  const { excludeRet: compIncludeRet } = extractKeyFormObject(excludeRet, excludeAttrs);
  const type = attrs.type as keyof typeof mapComponent;
  const component: Component = slots.default
    ? slots.default
    : mapComponent[type]
      ? mapComponent[type]()
      : mapComponent.input()

  const formItemSlots = {} as Record<string, Slot>
  function getSlots() {
    const ret = {} as Record<string, Slot>
    const name = attrs.name;
    const reg = new RegExp(`^${name}`)
    Object.keys(slots).forEach((item) => {
      if (item !== 'default' && reg.test(item)) {
        const newItem = item.replace(`${name}`, '')
        const key = newItem.charAt(0).toLowerCase() + newItem.slice(1)
        if (key === 'label') {
          formItemSlots.label = slots[item]!
        }
        else {
          ret[key] = slots[item]!
        }
      }
    })
    return ret;
  }

  const labelKey = `${includeRet.name}Label`
  const tooltipKey = `${includeRet.name}Tooltip`
  if (slots[`${labelKey}`]) {
    delete includeRet.label
    formItemSlots.label = slots[`${labelKey}`]!
  }

  if (slots[`${tooltipKey}`]) {
    delete includeRet.tooltip
    formItemSlots.tooltip = slots[`${tooltipKey}`]!
  }

  includeRet.labelCol = Object.assign({ style: { width: includeRet.labelWidth } }, (includeRet.labelCol || {}))
  includeRet.wrapperCol = { style: { width: '100px' } }

  return {
    includeRet,
    compIncludeRet,
    formItemSlots,
    component,
    getSlots,
  };
}
