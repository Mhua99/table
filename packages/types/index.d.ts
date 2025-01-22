export declare interface FormOption<T extends object> {
  /** 表单文字宽度 */
  labelWidth?: string
  /** 提交按钮 */
  submitBtn?: boolean
  /** 清空按钮 */
  emptyBtn?: boolean
  /** 提交按钮文字 */
  submitBtnText?: string
  /** 清空按钮文字 */
  emptyBtnText?: string
  /** 底部按钮显隐藏 */
  footerBtn?: boolean
  /** form 表单的 labelCol 字段 */
  labelCol?: object
  /** form 表单的 wrapperCol字段 */
  wrapperCol?: object
  /** 表单布局 */
  layout?: 'horizontal' | 'vertical' | 'inline'
  /** 表单文字位置 */
  labelAlign?: 'left' | 'right'
  /** Form组件的其他配置项，具体参考 https://www.antdv.com/components/form-cn#components-form-demo-form-context */
  otherConfig?: object
  /** 表单 marginRight */
  formMarighRight?: string
  column?: Column<T>[]
}

export declare interface TableOption<T extends object> extends FormOption<T> {
  /** 新增按钮显隐 */
  addBtn?: boolean
  /** 新增按钮文字 */
  addBtnText?: string
  /** 修改按钮显隐 */
  editBtn?: boolean
  /** 修改按钮文字 */
  editBtnText?: string
  /** 删除按钮显隐 */
  delBtn?: boolean
  /** 删除按钮文字 */
  delBtnText?: string
  /** 查看按钮显隐 */
  viewBtn?: boolean
  /** 查看按钮文字 */
  viewBtnText?: string
  /** column按钮显隐 */
  columnBtn?: boolean
  /** 刷新按钮显隐 */
  refreshBtn?: boolean
  /** 表格大小按钮显隐 */
  sizeBtn?: boolean
  /** 菜单显隐 */
  menu?: boolean
  /** 菜单宽度 */
  menuWidth?: number
  /** 搜索条件超过多少个隐藏 */
  searchIndex?: number
  /** 搜索条件按钮是否显示 */
  searchIcon?: boolean
  /** 弹窗宽度 */
  dialogWidth?: number
  /** 搜索label位置 */
  searchLabelAlign?: 'left' | 'right'
  /** 搜索 label 宽度 */
  searchLabelWidth?: string
  /** 是否显示序号 */
  index?: boolean
  /** 序号列是否固定 */
  indexFixed?: boolean
  /** table 高度 */
  height?: number
  /** 表单右边边距 */
  formMarighRight?: string
  /** 表格的宽度 */
  tableX?: number
  /** 表格文字位置 */
  align?: AlignType
  /** 是否显示 card */
  card?: boolean
  /** 新增模式 弹窗标题 */
  addTitle?: string
  /** 编辑模式 弹窗标题 */
  editTitle?: string
  /** 查看模式 弹窗标题 */
  viewTitle?: string
}

export interface UseTableParams<T> {
  rowKey?: string
  getList: (params: T) => Promise<any>
  create: (data: T) => Promise<any>
  update: (data: T) => Promise<any>
  remove: (id: string) => Promise<any>
  tableOption: TableOption<T>
  resFormatter?: (res: any) => any[]
  totalFormatter?: (res: any) => number
  searchForm?: any
  queryForm?: any
  handleSearch?: () => void
  handleEmpty?: () => void
  handleSubmit?: (row: T, closeLoading: () => void, closeDialog: () => void) => void
  handleRemove?: (row: T) => void
  handleRefresh?: () => void
}

/** 表单模式 */
export type FormType = 'add' | 'view' | 'edit'
/** 标题位置 */
export type AlignType = 'left' | 'center' | 'right'

export interface Column<T extends object> {
  /** 表单项标题 */
  label?: string
  /** 表单绑定字段 */
  prop: keyof T
  name?: keyof T
  /** 表单项类型 input | number | date | datetime | month | checkbox | radio 等 */
  type?: string
  /** 表单项宽度 默认值为 12，最高 24 */
  span?: number
  /** 表单 placeholder */
  placeholder?: string | string[]
  /** 列表页字段宽度 */
  width?: number
  /** 表单 label 宽度 */
  labelWidth?: string
  /** 表单默认值 */
  value?: string | number
  /** 表单校验规则 */
  rules?: Rule[]
  /** 字典项 */
  dicData?: DicData[]
  /** 字典请求url */
  dicUrl?: string
  /** 字典配置项 */
  dicProps?: DicProps
  /** 全部模式下是否显示 */
  display?: boolean
  /** 新增模式下是否显示 */
  addDisplay?: boolean
  /** 编辑模式下是否显示 */
  editDisplay?: boolean
  /** 查看模式下是否显示 */
  viewDisplay?: boolean
  /** 所有模式下是否禁用 */
  disabled?: boolean
  /** 新增模式下是否禁用 */
  addDisabled?: boolean
  /** 编辑模式下是否禁用 */
  editDisabled?: boolean
  /** 时间日期显示 */
  format?: string
  /** 时间日期数值 */
  valueFormat?: string
  /** 数据类型 */
  dataType?: string
  /** 时间类型控件，表单模式下是否展示范围 */
  range?: boolean
  /** 时间类型控件，搜索模式下是否展示范围 */
  searchRange?: boolean
  /** 搜索模式下控件的标题 */
  searchLabel?: string
  /** 搜索模式下 排序 */
  searchOrder?: number
  /** 表格文字位置 */
  align?: AlignType
  /** 表格字段排序 默认是 0 */
  sort?: number
  /** 发送请求后，返回的字典数据路径 */
  dicFormatter?: (object) => Record<string, string | number>[]
  [string: string]: unknown
}

export interface TableInstance<T> {
  formRef: Ref<any>
  formType: FormType
  rowAdd: (modelValue: T) => void
  rowEdit: (modelValue: T) => void
  rowView: (modelValue: T) => void
  submit: (done: () => void) => void
}

export type modelValue =
  | string
  | number
  | string[]
  | number[]
  | boolean
  | undefined

/** 字典项 */
export interface DicProps {
  label: string | number
  value: string | number
  valueType?: string
  children?: string
}

/** 字典数据 */
export interface DicData extends Omit<DicProps, 'children'> {
  children?: DicData[]
  row?: CommObj
}

export interface Rule {
  [key: string]: string | number | boolean | undefined
}

export interface FormEmits {
  (e: 'update'): void
  (e: 'delete'): void
}

export declare interface AttrsType {
  [key: string]: unknown
}

export interface CommObj {
  [key: string]: unknown
}
