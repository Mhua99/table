## 表格组件
案例
<iframe src="/demo.html" width="100%" height="1200px" frameborder="0"></iframe>

表格代码如下：
```vue
<script lang="ts" setup>
import { create, getList, remove, update } from './api';
import { Button } from 'ant-design-vue';

import { Table, useTable } from '@mhua/table';
import { tableOption } from './option'

const { getDataList, valBind, tableRef, collection } = useTable({
  tableOption,
  getList,
  create,
  update,
  remove,
  queryForm: {},
  searchForm: {},
})

getDataList();

function handleClick() {
  tableRef.value.rowAdd({ name: 'ninhao' });
}
</script>

<template>
<Table v-bind="valBind">
  <template #menuLeft>
    <Button @click="handleClick">
      新增按钮
    </Button>
  </template>
  <template #menuRight>
    <span style="color: red;">右侧插槽</span>
  </template>
  <template #name="{ record }">
    <span>{{ `${record.age}岁 - ${record.name}` }}</span>
  </template>
  <template #nameForm>
    <span>{{ valBind.modelValue.name }}</span>
  </template>
  <template #nameSearch>
    <div>搜索</div>
  </template>
  <template #nameSearchLabel>
    <div>9999</div>
  </template>
  <template #nameFormLabel>
    <div>cs11</div>
  </template>
  <template #dialogFooter="data">
    <Button @click="data">111111</Button>
  </template>
</Table>
</template>
```

option配置项

```typescript
import { type TableOption } from "@mhua/table"

export interface FormData {
  id?: string
  name?: string
  age?: number
  class?: string
  bridthday?: string
  fatherName?: string
  montherName?: string
  interest?: string
  remark?: string
}

export const tableOption: TableOption<FormData> = {
  // /** 表单文字宽度 */
  // labelWidth: '100px',
  // /** 提交按钮 */
  // submitBtn: true,
  // /** 清空按钮 */
  // emptyBtn: true,
  // /** 提交按钮文字 */
  // submitBtnText: '提交按钮',
  // /** 清空按钮文字 */
  // emptyBtnText: '清空按钮',
  // /** 表单布局 */
  // layout: 'horizontal',
  // /** 表单文字位置 */
  // labelAlign: 'right',
  searchIndex: 3,
  searchIcon: true,
  // dialogWidth: 700,
  searchLabelWidth: '80px',
  // index: true,
  indexFixed: true,
  formMarighRight: '40px',
  // editTitle: "编辑",
  // addTitle: "新增",
  // viewTitle: "查看",
  // columnBtn: false,
  // refreshBtn: false,
  // sizeBtn: false,
  // addBtn: false,
  // editBtn: false,
  // delBtn: false,
  // align: "left",
  // columnBtn: false,
  // card: false,
  // submitBtn: false,
  // emptyBtn: false,
  // viewBtn: true,
  // viewBtnText: "查看",
  column: [
    {
      label: '名字',
      prop: 'name',
      rules: [
        { required: true, message: '请输入名字' },
      ],
      search: true,
      value: '测试默认数据',
    },
    {
      label: '年龄',
      prop: 'age',
      type: 'number',
      rules: [
        { required: true, message: '请输入年龄' },
      ],
      hide: true,
      viewDisplay: false,
      // addDisabled: true,
      editDisabled: true
    },
    {
      label: '班级',
      prop: 'class',
      type: 'select',
      dicData: [
        {
          label: '1班',
          value: 1,
        },
        {
          label: '2班',
          value: 2,
        },
        {
          label: '3班',
          value: 3,
        },
        {
          label: '4班',
          value: 4,
        },
        {
          label: '5班',
          value: 5,
        },
        {
          label: '6班',
          value: 6,
        },
      ],
      search: true,
      rules: [
        { required: true, message: '请输入班级' },
      ],
      // dataType: 'string',
    },
    {
      label: '出生日期',
      prop: 'bridthday',
      type: 'date',
      search: true,
      rules: [
        { required: true, message: '请输入出生日期' },
      ],
      sort: 1
    },
    {
      label: '名字11',
      prop: 'fatherName',
      search: true,
    },
    {
      label: '名字22',
      prop: 'montherName',
      search: true,
      sort: 2
    },
    {
      label: '兴趣爱好',
      prop: 'interest',
      type: 'checkbox',
      span: 24,
      dicData: [
        {
          id: 1,
          name: "篮球"
        },
        {
          id: 2,
          name: "足球"
        },
        {
          id: 3,
          name: "羽毛球"
        },
        {
          id: 4,
          name: "跑步"
        },
      ],
      // dicUrl: '/api/getDicNew',
      // dicProps: {
      //   label: 'name',
      //   value: 'id',
      //   valueType: 'string',
      // },
      // dicFormatter(res) {
      //   return res.data;
      // },
      // dataType: 'string',
      sort: 6
    },
    {
      label: '备注',
      prop: 'remark',
      type: 'textarea',
      span: 24,
      hide: true,
    },
  ],
}
```


### props 属性
| 属性        | 类型     |  默认值  | 说明 |
| --------   | -----:     | :----: | :----: |
| v-model    | object     |   无   | 表单数据 |
| Option     |  object     |   无   |  配置项  |
| v-model:searchForm   | object  |   无   |  搜索数据  |
| loading   | boolean  |   false   |  加载动画  |
| pagination   | object  |   无   |  antd pagination 分页组件属性  |

### 自定义事件
| 属性        | 说明       | 类型 |
| --------   | -----:      | :----: |
| @search    | 搜索事件     | (data: object) => void |
| @empty     |  清空事件       |  () => void  |
| @submit   | 表单提交事件   |  (data: object, closeLoading: () => void, done: () => void) => void |
| @delete   | 删除事件  |   (data:object) => void  |
| @refresh   | 刷新事件  |   () => void  |
| @pageSizeChange   | 分页触发事件  |   (current: number, pageSize: number) => void  |
