import type { PropType } from 'vue'

export const excludeAttrs = ['addDisabled', 'addDisplay', 'display', 'editDisabled', 'slots', 'span', 'viewDisplay', 'originItem', 'editDisplay']

export const dicFieldLabel = ['select', 'checkbox', 'radio']

export const allExcludeAttrs = [...excludeAttrs, 'dicData', 'dataIndex', 'hide', 'search', 'searchRange', 'title', 'type', 'value', 'align', 'colHide']

export const propProps = {
  prop: {
    type: String as PropType<string>,
    default: '',
  },
}

export const typeProps = {
  type: {
    type: String as PropType<string>,
  },
}

export const commProps = {
  ...propProps,
  dataType: {
    type: String as PropType<string>,
  },
}
