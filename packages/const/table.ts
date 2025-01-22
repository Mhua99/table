import type { PaginationProps } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { AlignType, CommObj, FormType, TableOption } from '~/types'

export const props = {
  /** 表单数据 */
  modelValue: {
    type: Object as PropType<CommObj>,
    default: () => ({}),
  },
  /** 表格数据 */
  data: {
    type: Array,
    default: () => ([]),
  },
  /** 配置项 */
  option: {
    type: Object as PropType<TableOption<any>>,
  },
  /** 表单类型 */
  formType: {
    type: String as PropType<FormType>,
    default: 'add',
  },
  /** 分页信息 */
  pagination: {
    type: Object as PropType<PaginationProps>,
  },
  searchForm: {
    type: Object as PropType<CommObj>,
    default: () => ({}),
  },
  beforeOpen: {
    type: Function as PropType<(formType: FormType, done: () => void) => void>,
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
};

export const emits = ['update:modelValue', 'update:searchForm', 'search', 'empty', 'submit', 'delete', 'refresh', 'pageSizeChange']

export const baseOption: Omit<TableOption<object>, 'column'> = {
  addBtn: true,
  editBtn: true,
  delBtn: true,
  viewBtn: false,
  columnBtn: true,
  refreshBtn: true,
  sizeBtn: true,
  card: true,
  addBtnText: '新增',
  editBtnText: '编辑',
  delBtnText: '删除',
  viewBtnText: '查看',
  menu: true,
  menuWidth: 200,
  dialogWidth: 900,
  index: true,
  height: 500,
  tableX: 0,
  align: 'center',
}

export const defaultMenuOption = {
  prop: 'operation',
  title: '菜单',
  dataIndex: 'operation',
  align: 'center' as AlignType,
  fixed: 'right',
  sort: -1,
}

export const pagination = {
  total: 0,
  showSizeChanger: true,
  showTotal: (total: number) => `共${total}条`,
}
