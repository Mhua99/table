import type { Column, CommObj, DicData, FormType, modelValue } from '~/types'

export function isDefaultBoolean(val: unknown, defalutValue = true) {
  if (typeof val === 'boolean') {
    return val
  }
  return defalutValue
}

/**
 * 获取display属性
 * @param item
 * @param type
 * @returns
 */
export function getDisplay(item: Column<object>, type: FormType) {
  const display = isDefaultBoolean(item.display)

  switch (type) {
    case 'view':
      return display && item.viewDisplay;
    case 'edit':
      return display && item.editDisplay;
    case 'add':
      return display && item.addDisplay;
  }
  return display;
}

/**
 *
 * @param item 获取placeholder
 * @returns
 */
export function getPlaceholder(item: Column<any>) {
  if (item.placeholder) {
    return item.placeholder;
  }

  if (['date', 'datetime', 'time', 'month', 'select'].includes(item.type || '')) {
    return item.range ? ['请选择开始时间', '请选择结束时间'] : `请选择${item.label}`;
  }

  return `请输入${item.label}`;
}

/**
 * 获取disabled属性
 * @param item
 * @param type
 * @returns
 */
export function getDisabled(item: Column<any>, type: FormType) {
  const disabled = isDefaultBoolean(item.disabled)
  switch (type) {
    case 'view':
      return true;
    case 'edit':
      return isDefaultBoolean(item.disabled) || item.editDisabled;
    case 'add':
      return isDefaultBoolean(item.disabled) || item.addDisabled;
  }
  return disabled
}

/**
 * 数据类型转换
 * @param val
 * @param type
 * @returns
 */
export function dataTypeTransform(val: modelValue, type: string) {
  if (val === undefined)
    return val;
  switch (type) {
    case 'number':
      return Number(val)
    case 'boolean':
      return Boolean(val)
    case 'string':
      return String(val)
    case 'array':
      return typeof val === 'string' ? val.split(',') : typeof val === 'number' ? [val] : val
    default:
      return val
  }
}

/**
 * 遍历字典数据
 * @param list
 * @param item
 */
export function flagTree(list: CommObj[], item: Column<any>) {
  const { label, value, children = '' } = item.dicProps || { label: 'label', value: 'value' };
  const newList = list.map((row: CommObj) => {
    const ret: DicData = {
      row,
      label: row[label] as string,
      value: row[value] as string | number,
    };
    if (children && row[children] && Array.isArray(row[children])) {
      ret.children = flagTree(row[children], item)
    }
    return ret;
  })
  return newList
}
