import type { Column } from '~/types'

export const formItemAttrs = [
  'label',
  'labelWidth',
  'rules',
  'error',
  'tooltip',
  'name',
  'labelCol',
  'wrapperCol',
]

export const baseColumn: Column<{ [key: string]: unknown }> = {
  label: '',
  prop: 'default',
  display: true,
  disabled: false,
  type: 'input',
  span: 12,
  viewDisplay: true,
  editDisplay: true,
  addDisplay: true,
  editDisabled: false,
  addDisabled: false,
  range: false,
  searchRange: false,
}
