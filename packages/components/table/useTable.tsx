import type { ExtractPropTypes, SetupContext, Slot } from 'vue'
import type { emits, props } from '~/const/table';
import type { Column, CommObj, DicData, FormType } from '~/types';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Button, CheckboxGroup, Menu } from 'ant-design-vue'
import { computed, createVNode, Fragment, h, reactive, ref, toRaw, toRef, watch } from 'vue'

import { dicFieldLabel } from '~/const/comm';
import { baseOption, defaultMenuOption } from '~/const/table'
import { requestFun } from '~/utils/fetch'
import { dataTypeTransform } from '~/utils/form';

type Props = Partial<ExtractPropTypes<typeof props>>

interface State {
  visible: boolean
  title: string
  formType: FormType
  submitLoading: boolean
  selectedKeys: string[]
  colmunSelectKeys: string[]
}

interface BodyCellData {
  record: CommObj
  column: Column<object> & { dataIndex: string }
  index: number
}

interface TitleCellData {
  column: Column<object> & { dataIndex: string }
  title: string
}

type AllSlots = Record<string, Record<string, Slot | null>>

export function useTable(props: Props, { emit, slots, expose }: SetupContext<typeof emits>) {
  /** 表单实例 */
  const formRef = ref();
  /** 搜索实例 */
  const searchRef = ref();
  /** 字典项 */
  const dicAll: Record<string, DicData[]> = {}

  const state = reactive<State>({
    visible: false,
    title: '新增',
    formType: 'add',
    submitLoading: false,
    selectedKeys: ['middle'],
    colmunSelectKeys: [],
  })

  /** 分页数据 */
  const pageAbout = {
    page: 1,
    pageSize: 10,
  }

  /** 搜索表单数据 */
  const searchForm = computed({
    get() {
      return props.searchForm || {}
    },
    set(val) {
      emit('update:searchForm', val);
    },
  });

  /** 表单配置项 */
  const tableOption = reactive({
    column: [],
    ...baseOption,
    ...props.option,
    footerBtn: false,
  })

  /** 刷新 */
  function refresh() {
    emit('refresh');
  }

  /** 新增 */
  function rowAdd(formData: CommObj = {}) {
    state.formType = 'add'
    state.title = tableOption.addTitle || '新增';
    function setFormData() {
      if (Object.keys(formData)?.length) {
        updateForm(formData)
      }
      else {
        const modelValue = formRef.value?.initForm || {}
        updateForm({ ...modelValue })
      }
    }

    if (props.beforeOpen) {
      props.beforeOpen(state.formType, () => {
        state.visible = true
        setFormData();
      })
    }
    else {
      state.visible = true
      setFormData();
    }
  }

  /** 编辑 */
  function rowEdit(data: CommObj) {
    state.formType = 'edit'
    state.title = tableOption.editTitle || '编辑';
    if (props.beforeOpen) {
      props.beforeOpen(state.formType, () => {
        state.visible = true
        updateForm(toRaw({ ...data }))
      });
    }
    else {
      state.visible = true
      updateForm(toRaw({ ...data }))
    }
  }

  /** 查看 */
  function rowView(data: CommObj) {
    state.formType = 'view'
    state.title = tableOption.viewTitle || '查看';
    if (props.beforeOpen) {
      props.beforeOpen(state.formType, () => {
        state.visible = true
        updateForm(toRaw({ ...data }))
      });
    }
    else {
      state.visible = true
      updateForm(toRaw({ ...data }))
    }
  }

  /** 删除 */
  function remove(data: CommObj) {
    emit('delete', toRaw(data));
  }

  /** 插槽过滤 */
  const allSlots: AllSlots = {
    dialog: {},
    form: {},
    table: {
      headerCell: (data: TitleCellData) => {
        const slotContent = slots[`${data.column.dataIndex}Label`]?.(data);
        if (slotContent !== undefined) {
          return Array.isArray(slotContent) ? slotContent : [createVNode('span', null, slotContent)];
        }
        return [createVNode('span', null, data.title)];
      },
      bodyCell: (data: BodyCellData) => {
        function showLabel() {
          const { record, column } = data;
          const value = record[`${data.column.dataIndex}`]
          const dicData = column.dicData || dicAll[column.prop] || [];
          if (column.type === 'checkbox' || column.multiple) {
            const list = (value as string)?.split(',')?.map(str => dicData.find(item => String(item.value) === String(str))).filter(item => item) || []
            return list?.map(item => item?.label).join(',')
          }
          else {
            return dicData.find(item => String(item.value) === String(value))?.label || value;
          }
        }
        const { page, pageSize } = pageAbout
        return (
          [
            data.column.dataIndex === 'indexNum' && ((page - 1) * pageSize) + data.index + 1,
            data.column.dataIndex === 'operation' && (
              <Fragment>
                {tableOption.editBtn ? <Button type="link" icon={h(EditOutlined)} onClick={() => rowEdit(data.record)}>{tableOption.editBtnText}</Button> : null}
                {tableOption.viewBtn ? <Button type="link" class="m-table-btn-green" icon={h(EyeOutlined)} onClick={() => rowView(data.record)}>{tableOption.viewBtnText}</Button> : null}
                {tableOption.delBtn ? <Button type="link" icon={h(DeleteOutlined)} onClick={() => remove(data.record)} danger>{tableOption.delBtnText}</Button> : null}
                {slots.menu && slots.menu?.(data)}
              </Fragment>
            ),
            slots[data.column.dataIndex] && slots[data.column.dataIndex]?.(data),
            !slots[data.column.dataIndex] && dicFieldLabel.includes(data.column.type || '') && showLabel(),
          ]
        )
      },
    },
    search: {
      leftBtn: slots.searchLeftBtn || null,
      rightBtn: slots.searchRightBtn || null,
    },
  };

  function setDic(item: Column<object>) {
    if (item.dicData?.length) {
      dicAll[item.prop] = item.dicData;
    }

    if (item.dicUrl) {
      requestFun(item.dicUrl).then((res) => {
        const { label = 'label', value = 'value', valueType } = item.dicProps || {};
        const row = tableOption.column.find(col => col.prop === item.prop) || {} as Column<object>;
        row.dicData = item.dicFormatter?.(res)?.map(item => ({
          label: item[label],
          value: valueType ? (dataTypeTransform(item[value], valueType) as string | number) : item[value],
          row: item,
        }));
        dicAll[item.prop] = row.dicData || [];
      })
    }
  }

  /** 分类插槽 */
  function getSlots(prop: string | number) {
    const searchKey = new RegExp(`^${prop}Search`)
    const formKey = new RegExp(`^${prop}Form`)
    Object.keys(slots).forEach((key) => {
      if (searchKey.test(key)) {
        if (slots[key]) {
          const newProp = key.replace(`${prop}Search`, '') ? key.replace(`Search`, '') : prop
          allSlots.search[newProp] = slots[key]
        }
      }
      else if (formKey.test(key)) {
        const newProp = key.replace('Form', '')
        if (slots[key]) {
          allSlots.form[newProp] = slots[key]
        }
      }
    });
  }

  /** 表格配置项 */
  tableOption.column = (props.option?.column || [])?.map((item: Column<object>, index: number) => {
    const newItem = {
      hide: false,
      sort: 0,
      ...item,
      title: item.label,
      dataIndex: item.prop,
      align: item.align || tableOption.align,
      colHide: item.hide || false,
    }

    getSlots(item.prop);
    if (['select', 'radio', 'checkbox', 'cascader'].includes(item.type!)) {
      setDic(newItem);
    }
    return newItem
  });

  if (tableOption.index) {
    const indexColumn = {
      prop: 'indexNum',
      title: '序号',
      dataIndex: 'indexNum',
      display: false,
      align: 'center',
      width: 80,
      sort: 999999,
    } as Column<any>;

    if (tableOption.indexFixed)
      indexColumn.fixed = tableOption.indexFixed

    tableOption.column.unshift(indexColumn)
  }

  /** 是否显示菜单 */
  if (tableOption.menu) {
    tableOption.column.push({ ...defaultMenuOption, width: tableOption.menuWidth })
  }

  if (slots.dialogFooter) {
    allSlots.dialog.footer = slots.dialogFooter;
  }

  state.colmunSelectKeys = tableOption.column.filter(item => !item.hide).map(item => item.prop) as string[]

  /** 用于遍历 */
  const formOption = computed(() => {
    return {
      ...tableOption,
      column: tableOption.column.filter(item => item.dataIndex !== 'operation'),
    }
  });

  function emitsEvent(eventName: string, ...args: any) {
    emit(eventName, ...args);
  }

  /** 弹窗关闭 */
  function close(val: boolean) {
    state.visible = val;
    formRef.value.resetFields();
  }

  /** 提交按钮 */
  function submit(done: () => void) {
    formRef.value.validate((isValidate: boolean, form: CommObj) => {
      if (isValidate) {
        state.submitLoading = true;
        const closeLoading = () => state.submitLoading = false
        emit('submit', toRaw(props.modelValue), closeLoading, done);
      }
    });
  }

  /** 更新表单数据 */
  function updateForm(row: CommObj) {
    emit('update:modelValue', row);
  }

  /** 分页事件 */
  function pageSizeChange(page: number, pageSize: number) {
    pageAbout.page = page;
    pageAbout.pageSize = pageSize;
    emit('pageSizeChange', page, pageSize)
  }

  /** 弹窗关闭之后 */
  function afterClose() {
    state.submitLoading = false
  }

  function menuClick(val: { key: string }) {
    state.selectedKeys = [val.key]
  }

  const getMenu = () => (
    <Menu selected-keys={state.selectedKeys} onClick={menuClick}>
      <Menu.Item key="default">
        表格（大）
      </Menu.Item>
      <Menu.Item key="middle">
        表格（中）
      </Menu.Item>
      <Menu.Item key="small">
        表格（小）
      </Menu.Item>
    </Menu>
  );

  function getColumnSettings() {
    const options = tableOption.column.filter(item => !item.hide && item.prop !== 'operation').map((item) => {
      return {
        label: item.title,
        value: item.prop,
      };
    })
    return (
      <CheckboxGroup v-model:value={state.colmunSelectKeys} class="checkboxGroup-settings" options={options} />
    )
  }

  watch(() => state.colmunSelectKeys, (val) => {
    tableOption.column.forEach((item) => {
      if (item.prop !== 'operation') {
        item.colHide = item.hide || !val.includes(item.prop as string)
      }
    })
  });

  const formType = toRef(state, 'formType')

  expose({
    formRef,
    submit,
    rowAdd,
    rowEdit,
    rowView,
    formType,
  })

  return {
    formRef,
    searchRef,
    tableOption,
    allSlots,
    searchForm,
    state,
    formOption,
    emitsEvent,
    rowAdd,
    close,
    submit,
    updateForm,
    refresh,
    pageSizeChange,
    afterClose,
    getMenu,
    getColumnSettings,
  }
}
