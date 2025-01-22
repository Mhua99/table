import type { AttrsType, CommObj } from '~/types'

interface extractKeyFormObjectReturnType {
  includeRet: Pick<AttrsType, keyof AttrsType>
  excludeRet: Pick<AttrsType, keyof AttrsType>
}

/*
  * 从对象中提取指定key值
  * @args  obj 对象   keyList：获取对应的key
  * @return  { includeRet, excludeRet }
  *
*/
export function extractKeyFormObject(
  obj: AttrsType,
  keyList: string
): extractKeyFormObjectReturnType
export function extractKeyFormObject(
  obj: AttrsType,
  keyList: string[]
): extractKeyFormObjectReturnType

export function extractKeyFormObject(
  obj: AttrsType,
  keyList: string | string[],
): extractKeyFormObjectReturnType {
  const includeRet: AttrsType = {}
  const excludeRet: AttrsType = {}

  if (typeof keyList === 'string') {
    keyList = keyList.split(',')
  }

  for (const key in obj) {
    const isExist = keyList.includes(key);
    isExist ? (includeRet[key] = obj[key]) : (excludeRet[key] = obj[key]);
  }
  return { includeRet, excludeRet };
}

/**
 * 排除value没有值的数据
 * @param obj
 * @returns
 */
export function getHasValueObj(obj: CommObj) {
  const ret = {} as CommObj
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') {
      ret[key] = obj[key]
    }
  }
  return ret;
}
