import type { UnwrapRef } from 'vue'
import type { CommObj, TableInstance, TableOption, UseTableParams } from '~/types';

import { message, Modal } from 'ant-design-vue'
import { computed, reactive, ref, toRef } from 'vue';

import { getSettings } from '~/utils/collect'
import { getHasValueObj } from '~/utils/object'
import Collection from './collection';
import { defaultResFormatter, defaultTotalFormatter } from './const'

interface State<T> {
  searchForm: T
  queryForm: {
    pageSize: number
    current: number
  } & T
  loading: boolean
  data: T[]
  formData: T
  pagination: {
    total: number
  } & CommObj
}

// 定义 TableReturn 接口
interface TableReturn<T> {
  getDataList: () => Promise<void>
  formData: import('vue').ToRef<T>
  valBind: import('vue').ComputedRef<{
    'ref': import('vue').Ref<TableInstance<T>>
    'data': T[]
    'searchForm': T
    'modelValue': T
    'loading': boolean
    'option': TableOption<T>
    'pagination': {
      total: number
    } & CommObj
    'onUpdate:modelValue': (val: UnwrapRef<T>) => void
    'onUpdate:searchForm': (val: UnwrapRef<T>) => void
    'onSearch': () => void
    'onEmpty': () => void
    'onSubmit': (row: CommObj, closeLoading: () => void, closeDialog: () => void) => Promise<void>
    'onDelete': (row: CommObj) => void
    'onRefresh': () => void
    'onPageSizeChange': (current: number, pageSize: number) => void
  }>
  state: State<T>
  tableRef: import('vue').Ref<TableInstance<T>>
  collection: Collection
}

export function useTable<T extends object>(options: UseTableParams<T>): TableReturn<T> {
  const collection = new Collection();
  /** 合并配置项 */
  const assignOptions = Object.assign({}, getSettings().hookUseTableSettings, options);

  const {
    rowKey = 'id',
    getList,
    create,
    update,
    remove,
    tableOption,
    resFormatter = defaultResFormatter,
    totalFormatter = defaultTotalFormatter,
    searchForm = {},
    queryForm = {},
  } = assignOptions;

  const tableRef = ref();
  const state = reactive<State<T>>({
    searchForm: {
      ...searchForm,
    },
    queryForm: {
      pageSize: 10,
      current: 1,
      ...queryForm,
    },
    loading: false,
    data: [],
    formData: {} as T,
    pagination: {
      total: 0,
    },
  });

  /** 查询数据 */
  async function getDataList() {
    state.loading = true;
    const params = {
      ...getHasValueObj(state.queryForm),
      ...getHasValueObj(state.searchForm as any),
    };
    await collection.beforeGetList?.(params)
    getList(params).then(async (res: any) => {
      state.data = resFormatter(res)
      state.pagination.total = totalFormatter(res)
      await collection.afterGetList?.(res)
    }).finally(() => {
      state.loading = false;
    })
  }

  /** 表单提交数据 */
  async function handleSubmit(row: CommObj, closeLoading: () => void, closeDialog: () => void) {
    const request = row.id ? update : create;
    await collection.beforeSave?.(row);
    request(row).then(async (res: any) => {
      await collection.afterSave?.(res);
      getDataList();
      closeDialog();
      message.success(row.id ? '修改成功' : '新增成功');
    }).finally(() => {
      closeLoading();
    })

  }

  /** 删除事件 */
  function handleRemove(row: CommObj) {
    Modal.confirm({
      title: '提示',
      content: '是否删除该数据？',
      onOk() {
        const id = row[rowKey] as string;
        if (!id)
          return
        remove(id).then(() => {
          message.success('删除成功');
          getDataList();
        })
      },
    });

  }

  function onSearchForm(val: UnwrapRef<T>) {
    state.searchForm = val;
  }

  /** 搜索事件 */
  function handleSearch() {
    getDataList()
  }

  /** 清空事件 */
  function handleEmpty() {
    getDataList()
  }

  /** 刷新事件 */
  function handleRefresh() {
    getDataList()
  }

  /** 分页事件 */
  function pageSizeChange(current: number, pageSize: number) {
    state.queryForm.pageSize = pageSize;
    state.queryForm.current = current;
    getDataList();
  }

  function handleUpdateModelValue(val: UnwrapRef<T>) {
    state.formData = val;
  }

  const valBind = computed(() => {
    return {
      'ref': tableRef,
      'data': state.data,
      'searchForm': state.searchForm,
      'modelValue': state.formData,
      'loading': state.loading,
      'option': tableOption,
      'pagination': state.pagination,
      'onUpdate:modelValue': handleUpdateModelValue,
      'onUpdate:searchForm': onSearchForm,
      'onSearch': options.handleSearch || handleSearch,
      'onEmpty': options.handleEmpty || handleEmpty,
      'onSubmit': options.handleSubmit || handleSubmit,
      'onDelete': options.handleRemove || handleRemove,
      'onRefresh': options.handleRefresh || handleRefresh,
      'onPageSizeChange': pageSizeChange,
    }
  });

  return {
    getDataList,
    formData: toRef(state, 'formData'),
    valBind,
    state,
    tableRef,
    collection,
  } as TableReturn<T>;
}
