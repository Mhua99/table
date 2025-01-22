import type { CommObj } from '~/types'

export default class Collection {
  /** 获取数据之前操作 */
  beforeGetList: (params?: CommObj) => void = () => {};
  /** 获取数据之后操作 */
  afterGetList: (result?: CommObj) => void = () => {};
  /** 表单数据提交前 */
  beforeSave: (formData?: CommObj) => void = () => {};
  /** 表单数据提交后 */
  afterSave: (result?: CommObj) => void = () => {};

  setBeforeGetList(cb: (params?: CommObj) => void) {
    this.beforeGetList = cb
  }

  setAfterGetList(cb: (result?: CommObj) => void) {
    this.afterGetList = cb;
  }

  setBeforeSave(cb: (formData?: CommObj) => void) {
    this.beforeSave = cb;
  }

  setAfterSave(cb: (result?: CommObj) => void) {
    this.afterSave = cb;
  }
}
